import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const clientId = process.env.REACT_APP_TWITCH_ID
const clientSecret = process.env.REACT_APP_TWITCH_SECRET
const redirectUri = process.env.REACT_APP_TWITCH_URL

const TwitchCallback = () => {
    const history = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async (code) => {
            const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`;
            try {
                const response = await axios.post(tokenUrl);
                const accessToken = response.data.access_token;
                // Stocke le jeton d'accès dans un endroit sûr (par exemple, dans un état global ou dans un cookie)
                history.push("/"); // Redirige vers la page d'accueil
            } catch (error) {
                console.error("Erreur lors de la récupération du jeton d'accès", error);
            }
        };

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        if (code) {
            fetchAccessToken(code);
        }
    }, [history]);

    return <div>Chargement...</div>;
};

export default TwitchCallback;