import { useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AuthContext from "./AuthContext"
import Cookies from "js-cookie"
import Loading from "../Loading"

const clientId = process.env.REACT_APP_TWITCH_ID
const clientSecret = process.env.REACT_APP_TWITCH_SECRET
const redirectUri = process.env.REACT_APP_TWITCH_URL
const baseUrl = process.env.REACT_APP_API_URL

const TwitchCallback = () => {
    const { setJwt, setUserData, refreshAccessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(async () => {
            const jwt = Cookies.get("token")
            if (jwt) {
                setJwt(jwt)
            } else {
                const newJwt = await refreshAccessToken()
                if (newJwt) {
                    setJwt(newJwt)
                }
            }
        }, 1000)
    }, [setJwt, refreshAccessToken])

    useEffect(() => {
        const createUserInDatabase = async (accessToken) => {
            try {
                const response = await axios.get(
                    `${baseUrl}/api/user/auth/twitch/callback?access_token=${accessToken}`,
                    { withCredentials: true }
                )
                console.log("User created in database", response.data)
            } catch (error) {
                console.error(
                    "Erreur lors de la création de l'utilisateur dans la base de données",
                    error
                )
            }
        }

        const fetchAccessToken = async (code) => {
            const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`
            try {
                const response = await axios.post(tokenUrl)
                const accessToken = response.data.access_token
                const userData = await fetchUserData(accessToken)
                setUserData(userData)
                await createUserInDatabase(accessToken)
                navigate("/")
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération du jeton d'accès",
                    error
                )
            }
        }

        const fetchUserData = async (accessToken) => {
            try {
                const response = await axios.get(
                    "https://api.twitch.tv/helix/users",
                    {
                        headers: {
                            "Client-ID": clientId,
                            Authorization: `Bearer ${accessToken}`
                        }
                    },
                    { withCredentials: true }
                )
                const userData = response.data.data[0]
                return userData
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données de l'utilisateur",
                    error
                )
            }
        }

        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get("code")
        if (code) {
            fetchAccessToken(code)
        }
    }, [navigate, setJwt, setUserData])

    return <Loading />
}

export default TwitchCallback
