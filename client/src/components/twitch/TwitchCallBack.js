import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import Cookies from "js-cookie";

const clientId = process.env.REACT_APP_TWITCH_ID
const clientSecret = process.env.REACT_APP_TWITCH_SECRET
const redirectUri = process.env.REACT_APP_TWITCH_URL

const TwitchCallback = () => {
    const { setAccessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async (code) => {
            const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`;
            try {
                const response = await axios.post(tokenUrl);
                const accessToken = response.data.access_token;
                Cookies.set("accessToken", accessToken, /*{ secure: true }*/); // Stocke le jeton d'accès dans un cookie sécurisé
                setAccessToken(accessToken); // Stocke le jeton d'accès dans le contexte d'authentification
                navigate("/"); // Redirige vers la page d'accueil
            } catch (error) {
                console.error("Erreur lors de la récupération du jeton d'accès", error);
            }
        };

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        if (code) {
            fetchAccessToken(code);
        }
    }, [navigate, setAccessToken]);

    return <div>Chargement...</div>;
};

export default TwitchCallback;