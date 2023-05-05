import { useContext } from "react";
import AuthContext from '../twitch/AuthContext';

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

const clientId = process.env.REACT_APP_TWITCH_ID
const redirectUri = encodeURIComponent(process.env.REACT_APP_TWITCH_URL)
const responseType = "code";
const scope = encodeURIComponent("user:read:email");

const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function TwitchLogin() {
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const handleLogout = (event) => {
    event.preventDefault();
    deleteCookie("accessToken");
    setAccessToken(null);
  };

    return (
        <>
            {accessToken ? (<a href="#" onClick={handleLogout}>Déconnexion <SvgTwitch /></a>) : (<a href={authUrl}>Connexion avec Twitch <SvgTwitch /></a>)}
        </>
    );
}

export default TwitchLogin;