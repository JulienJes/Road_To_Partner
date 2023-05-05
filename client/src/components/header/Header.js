import { NavLink } from "react-router-dom";
import TwitchLogin from '../twitch/TwitchLogin';

function Header () {
    return (
        <header>
            <div className="navigation">
                <TwitchLogin />
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