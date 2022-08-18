import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import 'react-phone-input-2/lib/style.css'
import "./auth.sass"
import sideImage from "../../images/webp/image2.webp"
import PhoneInput from "react-phone-input-2"


const Login = () => {
    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [dirtyPhone, setDirtyPhone] = useState(false)

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [dirtyPassword, setDirtyPassword] = useState(false)



    const blurHandler = (e) => {
        switch (e.target.name) {
            case "phone":
                setDirtyPhone(true)
                break
            case "password":
                setDirtyPassword(true)
                break
            default:
                break
        }
    }
    const login = async () => {
        try {
            const response = await fetch("auth/login", {
                method: "POST",
                body: JSON.stringify({"phone": phone, "password": password}),
                headers: {"Content-type": "application/json"}
            })
            const data = await response.json()
            localStorage.setItem("userId", JSON.stringify(data))
            window.location.pathname = `profile/${data.id}`
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        const regExp = /\d{11}/g
        if (!regExp.test(String(phone))) {
            setPhoneError("Проверьте правильность пароля")
        } else {
            setPhoneError("")
        }
    }, [phone])

    useEffect(() => {
        const regExp = /(?=.*\d)(?=.*[^\w\s])(?=.*[a-z])(?=.*[A-Z])[\da-zA-Z!@#$%^&*]{8,}/g
        if (!regExp.test(String(password))) {
            setPasswordError("Проверьте правильность пароля")
        } else {
            setPasswordError("")
        }
    },[password])

    return (
        <main className="auth">
            <div className="wrapper_vertical">
                <div className="auth__main">
                    <div className="side-image-container"><img className="side-image" src={sideImage} alt=""/></div>
                    <div className="auth__content">
                        <h2 className="auth__title">
                            Вход
                        </h2>
                        <h4 className="auth__subtitle">
                            Продолжим работу с психологом? <br/>
                            Введи свой номер телефона и пароль
                        </h4>
                        <form className="auth__form" action="">
                            <PhoneInput
                                country='ru'
                                value={phone}
                                onClick={() => setDirtyPhone(true)}
                                onChange={setPhone}
                            />
                            {(phoneError && dirtyPhone) &&
                                (<span style={{marginBottom:"16px"}} className="auth__error">Проверьте правильность номера</span>)
                            }
                            <input
                                placeholder="Пароль"
                                className="auth__form-input"
                                type="password"
                                value={password}
                                onBlur={blurHandler}
                                onChange={e => setPassword(e.target.value)}
                                name="password"
                            />
                            {(passwordError && dirtyPassword) &&
                                (<span style={{marginBottom:"16px"}} className="auth__error">Проверьте правильность пароля</span>)
                            }
                            <button
                                className="auth__form-button"
                                disabled={passwordError || phoneError}
                                onClick={(e)=>{
                                e.preventDefault()
                                login()
                            }}>
                                Отправить
                            </button>
                        </form>
                        <div className="auth__footer">
                            Впервые у нас? Сначала <Link style={{color:"rgba(153, 49, 204, 1)"}} to='/registry'>зарегистрируйся</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Link className="auth__bottom" to="restore-password">Забыли пароль?</Link>
        </main>
    )
}

export default Login