import {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import "./profile.sass"


const Profile = () => {
    const {id} = useParams()
    const [userData, setUserData] = useState({})
    const [loader, setLoader] = useState(true)
    const requestData = async () => {
        const response = await fetch(`/user?id=${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
        const data = await response.json()
        return data
    }
    useEffect(() => {
        requestData()
            .then(data => setUserData({
                name: data.name, birth: data.birth, email: data.email, tg: data.tg, phone: data.phone, id: data.id
            }))
            .then(() => setLoader(false))
    }, [])
    return (
        <main className="profile">
            <div className="wrapper">
                <span>
                    <Link className="profile__link" to="/">Главная</Link> / <Link className="profile__link" to=''>Профиль</Link>
                </span>
            </div>
            <div className="wrapper_vertical">
                <h2 className="profile__title">
                    Профиль
                </h2>
                <div className="profile__data">
                    {!loader
                        ?
                        <>
                            <div className="profile__data-item">
                                <span className="profile__data-title">Имя или псевдоним *</span>
                                <h4 className="profile__data-text">{userData.name}</h4>
                            </div>
                            <div className="profile__data-item">
                                <span className="profile__data-title">Дата рождения * </span>
                                <h4 className="profile__data-text">{userData.birth && userData.birth.split('-').reverse().join('.')}</h4>
                            </div>
                            <div className="profile__data-item">
                                <span className="profile__data-title">E-mail</span>
                                <h4 className="profile__data-text">{userData.email? userData.email : "Не указан"}</h4>
                            </div>
                            <div className="profile__data-item">
                                <span className="profile__data-title">Ник в Телеграм</span>
                                <h4 className="profile__data-text">{userData.tg? `@${userData.tg}` : "Не указан"}</h4>
                            </div>
                        </>
                        :
                        <h1>Загрузка</h1>


                    }
                </div>
            </div>
        </main>
    )
}

export default Profile;