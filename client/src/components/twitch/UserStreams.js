import { useEffect, useState } from "react"
import axios from "axios"
import TwitchStream from "./TwitchStream"

const clientId = process.env.REACT_APP_TWITCH_ID
const clientSecret = process.env.REACT_APP_TWITCH_SECRET

const UserStreams = ({ users }) => {
    const [liveUsers, setLiveUsers] = useState([])
    const [accessToken, setAccessToken] = useState(null)

    const fetchAccessToken = async () => {
        try {
            const { data } = await axios.post(
                "https://id.twitch.tv/oauth2/token",
                null,
                {
                    params: {
                        client_id: clientId,
                        client_secret: clientSecret,
                        grant_type: "client_credentials"
                    }
                }
            )
            setAccessToken(data.access_token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAccessToken()
    }, [])

    useEffect(() => {
        const fetchLiveUsers = async () => {
            console.log(accessToken)
            const filteredLiveUsers = []

            for (let user of users) {
                const response = await axios.get(
                    `https://api.twitch.tv/helix/streams?user_login=${user}`,
                    {
                        headers: {
                            "Client-ID": clientId,
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )

                if (response.data.data.length > 0) {
                    filteredLiveUsers.push(user)
                }

                if (filteredLiveUsers.length >= 3) {
                    break
                }
            }

            setLiveUsers(filteredLiveUsers)
        }

        if (users) {
            fetchLiveUsers()
        }
    }, [users, accessToken])

    return (
        <>
            {users ? <h3>Ces participants sont en live!</h3> : null}
            <div>
                {liveUsers.map((user) => (
                    <TwitchStream key={user} channel={user} />
                ))}
            </div>
        </>
    )
}

export default UserStreams
