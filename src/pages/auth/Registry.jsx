import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import sideImage from "../../images/webp/image2.webp"
import PhoneInput from "react-phone-input-2"
import Verification from "../../components/auth/Verification";


const Registry = () => {
    const [stage, setStage] = useState("Registry")
    const [phone, setPhone] = useState("")
    const [dirtyPhone, setDirtyPhone] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const inputHandler = (e) => {
        setPhone(e)
    }
    useEffect(() => {
        phone.length > 0 && setDirtyPhone(true)
        if (phone.length < 11) {
            setPhoneError(true)
        } else {
            setPhoneError(false)
        }
    }, [phone, dirtyPhone, phoneError])
    return (
        <main className="auth">
            <div className="wrapper_vertical">
                <div className="auth__main">
                    <div className="side-image-container">
                        <img className="side-image" src={sideImage} alt=""/>
                    </div>
                    {
                        stage === "Registry"
                            ?
                            <div className="auth__content">
                                <h2 className="auth__title">
                                    Регистрация
                                </h2>
                                <h4 className="auth__subtitle">
                                    Давай начнем подбор психолога. <br/>
                                    Введи свой номер телефона
                                </h4>
                                <form className="auth__form" action="">
                                    <PhoneInput
                                        country='ru'
                                        value={phone}
                                        onClick={() => setDirtyPhone(true)}
                                        onChange={inputHandler}
                                    />
                                    {dirtyPhone && phoneError &&
                                        <span className="auth__error">
                                            Проверьте правильность введенных данных
                                        </span>
                                    }
                                    <button
                                        className="auth__form-button"
                                        disabled={phoneError}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            localStorage.setItem("userPhone", JSON.stringify(phone))
                                            setStage("Verify")
                                        }}
                                    >
                                        Получить код
                                    </button>
                                </form>
                                <div className="auth__footer">
                                    Уже есть личный кабинет? <Link to='/'>Войти</Link>
                                </div>
                            </div>
                            :
                            <Verification/>
                    }

                </div>
            </div>
            {
                stage === "Registry"
                    ?
                    <div style={{color:"black"}} className="auth__bottom">
                        При входе на сервис вы принимаете <Link style={{color:"rgba(153, 49, 204, 1)"}} to="confidential">
                        Политику конфиденциальности</Link> и <Link style={{color:"rgba(153, 49, 204, 1)"}} to="terms">
                        Условия использования сервиса</Link>
                    </div>
                    :
                    <div className="auth__bottom">
                        Не приходит код? <Link to="/registry-data">Зарегистрироваться через email</Link>
                    </div>
            }
        </main>
    )
}

export default Registry