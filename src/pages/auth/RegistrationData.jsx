import {useEffect, useState} from "react"
import RegistrationDataField from "../../components/auth/RegistrationDataField"
import {Link} from "react-router-dom";


const RegistrationData = () => {
    const [registrationCompleted, setRegistrationCompleted] = useState(false)
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userId")).id || "")
    const [form, setForm] = useState({
        password: "", checkPassword: "", name: "", dob: "", email: "", telegram: ""
    })
    const [formValid, setFormValid] = useState(false)
    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'password':
                setPasswordDirty(true)
                break
            case 'checkPassword':
                setCheckPasswordDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            case 'dob':
                setDobDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            default:
                break
        }
    }
    //Password
    const [passwordError, setPasswordError] = useState("")
    const [passwordDirty, setPasswordDirty] = useState(false)
    //Password check
    const [checkPasswordError, setCheckPasswordError] = useState("")
    const [checkPasswordDirty, setCheckPasswordDirty] = useState(false)
    //Name
    const [nameError, setNameError] = useState("")
    const [nameDirty, setNameDirty] = useState(false)
    //Date
    const [dobError, setDobError] = useState("")
    const [dobDirty, setDobDirty] = useState(false)
    //E-mail
    const [emailError, setEmailError] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)

    const sendQuery = async () => {
        try {
            const requestData = {
                ...form,
                phone: JSON.parse(localStorage.getItem("userPhone")),
                birth: form.dob,
                tg: form.telegram
            }
            delete requestData.dob
            delete requestData.checkPassword
            delete requestData.telegram
            const response = await fetch("auth/register", {
                method: "POST",
                body: JSON.stringify({...requestData}),
                headers: {"Content-type": "application/json"}
            })
            if (response.status === 400) {
                alert("Пользователь уже существует")
            } else {
                const data = await response.json()
                localStorage.setItem("userId", JSON.stringify(data.id))
                setUserId(data.id)
                setRegistrationCompleted(true)
            }
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        const regExp = /(?=.*\d)(?=.*[^\w\s])(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z!@#$%^&*]{8,}/g
        if (!regExp.test(String(form.password))) {
            setPasswordError("Проверьте правильность пароля")
        } else {
            setPasswordError("")
        }
    }, [form.password])
    useEffect(() => {
        form.password !== form.checkPassword ? setCheckPasswordError("Пароли не совпадают") : setCheckPasswordError("")
    }, [form.password, form.checkPassword])
    useEffect(() => {
        let ageDifference = Date.now() - new Date(String(form.dob)).getTime()
        let ageDate = new Date(ageDifference)
        let day = Math.abs(ageDate.getUTCDay())
        let dob = Math.abs(ageDate.getUTCFullYear() - 1970)
        if (dob <= 18 && day <= 1) {
            setDobError("Для получения услуг тебе должно быть 18 или больше лет. Необходимо согласие родителей")
        } else {
            setDobError("")
        }
    }, [form.dob])
    useEffect(() => {
        const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regExp.test(String(form.email).toLowerCase())) {
            setEmailError("Пропущен символ @")
        } else {
            setEmailError("")
        }
    }, [form.email])
    useEffect(() => {
        let value = form.name.replace(/[^а-яА-Я\d_]/gi, '')
        setForm({...form, name: value})
        const regExp = /[а-яА-Я\d]{21}/g
        if (regExp.test(String(form.name))) {
            setNameError(`Превышено допустимое количество символов: сократите ${-(20 - form.name.length)} символов`)
        } else {
            setNameError("")
        }
    }, [form, form.name])
    useEffect(() => {
        let value = form.telegram.replace(/[^а-яА-Я\d_]/g, "")
        setForm({...form, telegram: value})
    }, [form, form.telegram])
    useEffect(() => {
        if (passwordError || checkPasswordError || nameError || dobError || (emailError && emailDirty)) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [passwordError, checkPasswordError, nameError, dobError, emailError, emailDirty])
    return (
        <main className="registration">
            <div className="wrapper_vertical">
                {
                    registrationCompleted
                        ?
                        <>
                            <h1 className="registration__title">
                                Присвоен идентификатор {userId}
                            </h1>
                            <Link className="registration__button" to={`/profile/${userId}`}>Перейти в профиль</Link>
                        </>
                        :
                        <>
                            <h2 className="registration__title">Укажи личные данные</h2>
                            <form className="registration__form">

                                <h3 className="registration__form-subtitle">
                                    Придумай пароль
                                </h3>
                                <RegistrationDataField
                                    required={true}
                                    label="Пароль"
                                    inputType="password"
                                    error={passwordError}
                                    dirty={passwordDirty}
                                    name="password"
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    value={form.password}
                                    help="Пароль должен состоять из 8ми символов и включать заглавную букву,
                        специальный символ и цифру"
                                />
                                <RegistrationDataField
                                    required={true}
                                    label="Повтори пароль"
                                    inputType="password"
                                    error={checkPasswordError}
                                    dirty={checkPasswordDirty}
                                    name="checkPassword"
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    value={form.checkPassword}
                                />
                                <h3 className="registration__form-subtitle">
                                    Расскажи о себе
                                </h3>
                                <RegistrationDataField
                                    required={true}
                                    label="Имя или псевдоним"
                                    inputType="text"
                                    error={nameError}
                                    dirty={nameDirty}
                                    name="name"
                                    value={form.name}
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    help="Будет доступен только твоему психологу и личному помощнику"
                                />
                                <RegistrationDataField
                                    required={true}
                                    customizationStyle="date"
                                    label="Дата рождения"
                                    inputType="date"
                                    error={dobError}
                                    dirty={dobDirty}
                                    name="dob"
                                    value={form.dob}
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    help="Для получения услуг тебе должно быть 16 или больше лет"
                                />
                                <h3 className="registration__form-subtitle">
                                    Укажи по желанию
                                </h3>
                                <RegistrationDataField
                                    label="E-mail"
                                    inputType="email"
                                    error={emailError}
                                    dirty={emailDirty}
                                    name="email"
                                    value={form.email}
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    help="Присылаем только информацию, связанную с твоими сессиями"
                                />
                                <RegistrationDataField
                                    customizationStyle="telegram"
                                    label="Ник в Телеграм"
                                    inputType="text"
                                    name="telegram"
                                    value={form.telegram}
                                    onChange={formHandler}
                                    onBlur={blurHandler}
                                    help="Присылаем только информацию, связанную с твоими сессиями"
                                />
                                <button
                                    type="submit"
                                    className="registration__button"
                                    disabled={!formValid}
                                    onClick={e => {
                                        e.preventDefault()
                                        sendQuery()
                                    }}
                                >
                                    Далее
                                </button>
                            </form>
                        </>
                }
            </div>
        </main>
    )
}

export default RegistrationData