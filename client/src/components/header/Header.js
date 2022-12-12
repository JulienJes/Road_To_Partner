import { NavLink } from "react-router-dom";

const CLIENT_ID = "wm098h6cmkbfm39crvq364ehioenqu";
const REDIRECT_URI = "http://localhost:3000";
const RESPONSE_TYPE = "token";
const SCOPES = "";

const SvgTwitch = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      fill="#FDFDFD" //#9146FF?
      {...props}
    >
      <path d="M391.17 103.47h-38.63v109.7h38.63ZM285 103h-38.63v109.75H285ZM120.83 0 24.31 91.42v329.16h115.83V512l96.53-91.42h77.25L487.69 256V0Zm328.24 237.75-77.22 73.12h-77.24l-67.6 64v-64h-86.87V36.58h308.93Z" />
    </svg>
);

function Header () {
    return (
        <header>
            <div className="navigation">
                {/*<a href="https://id.twitch.tv/oauth2/authorize?[parameters]">Connexion avec Twitch <SvgTwitch /></a>*/}
                <NavLink exact="true" to="/Building">Connexion avec Twitch <SvgTwitch /></NavLink>
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