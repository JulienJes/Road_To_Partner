import { useContext } from "react";
import { NavLink } from "react-router-dom";
import TwitchLogin from '../twitch/TwitchLogin';
import AuthContext from "../twitch/AuthContext";

function Header () {
    const { jwt, userData } = useContext(AuthContext);

    return (
        <header>
            <div className="navigation">
                <div className="navigation-greetings">
                    {jwt && userData ? <strong>Hello {userData.display_name} !</strong> : null}
                </div>
                <div className="navigation-login">
                    <TwitchLogin />
                </div>
            </div>
            <div className="logo-container">
                <NavLink exact="true" to="/">
                    <img src="/img/logo/logo.webp" alt="logo" key={Date.now()}/> { /* key={Date.now()} permet de forcer le rechargement de l'image */ }
                    <h1>Road To Partner</h1>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;