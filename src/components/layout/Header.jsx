import "./header.sass"
import HeaderLogo from "../../images/icons/header-logo.svg"
import HeaderFriend from "../../images/icons/header-friend.svg"

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper">
                <img className="header__logo" src={HeaderLogo} alt=""/>
                <img className="header__logo" src={HeaderFriend} alt=""/>
            </div>
        </header>
    )
}

export default Header