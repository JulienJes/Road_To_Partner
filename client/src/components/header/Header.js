import { useContext } from "react";
import { NavLink } from "react-router-dom";
import TwitchLogin from '../twitch/TwitchLogin';
import AuthContext from '../twitch/AuthContext';

function Header () {
    const { accessToken } = useContext(AuthContext);

    return (
        <header>
            <div>
                {accessToken ? <p>Salut!</p> : null}
            </div>
            <div className="navigation">
                <TwitchLogin />
            </div>
            <div className="logo-container">
                <NavLink exact="true" to="/">
                    <img src="./img/logo/logo.webp" alt="logo"/>
                    <h1>Road To Partner</h1>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;