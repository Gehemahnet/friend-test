import {useEffect, useState} from "react"

const Verification = () => {
    const [code, setCode] = useState("")
    const [dirtyCode, setDirtyCode] = useState(false)
    const [codeError, setCodeError] = useState("")
    //Timer
    const [[m,s], setTimer] = useState([0,15])
    const [timerOver, setTimerOver] = useState(false)
    const tick = () => {
        if (timerOver) return
        if (m === 0 && s === 0) {
            setTimerOver(true)
        } else if (s === 0) {
            setTimer([m - 1, 59])
        } else {
            setTimer([m, s - 1])
        }
    }
    const reset = () => {
        setTimer([0, 15])
        setTimerOver(false)
    }
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)
        return () => clearInterval(timerID)
    })
    //Validation of 6 digit code
    useEffect(() => {
        let newCode = code.replace(/\D/g,"")
        code.length > 6 && (newCode = newCode.substring(0, newCode.length - 1))
        setCode(newCode)
        const regExp = /^\d{6}/g
        !regExp.test(String(code)) ? setCodeError("Код состоит из 6 цифр") : setCodeError("")
    }, [code])
    return (
        <div className="auth__content">
            <h2 className="auth__title">
                Регистрация
            </h2>
            <h4 className="auth__subtitle">
                Введи полученный из СМС код
            </h4>
            <form className="auth__form" action="src/components/auth/Verification">
                <input
                    className={codeError && dirtyCode ? "auth__form-input _error" : "auth__form-input"}
                    type="text"
                    value={code}
                    onBlur={() => setDirtyCode(true)}
                    onChange={e => setCode(e.target.value)}
                />
                {dirtyCode &&
                    <span style={{marginBottom:"15px"}} className="auth__error">
                        {codeError}
                    </span>
                }
                <button
                    className="auth__form-button"
                    type="submit"
                    disabled={codeError}
                >
                    Получить код
                </button>
            </form>
            <button
                disabled={!timerOver}
                className="auth__timer"
                onClick={(e) => {
                    e.preventDefault()
                    reset()
                }}
            >
                Отправить код снова {!timerOver && `${m}:${s}`}
            </button>
        </div>
    )
}

export default Verification