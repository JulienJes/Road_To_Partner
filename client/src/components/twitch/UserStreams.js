import { useEffect, useState } from "react"
import axios from "axios"
import TwitchStream from "./TwitchStream"

const clientId = process.env.REACT_APP_TWITCH_ID

const UserStreams = ({ users }) => {
    const [liveUsers, setLiveUsers] = useState([])

    useEffect(() => {
        const fetchLiveUsers = async () => {
            const liveUsers = []

            for (let user of users) {
                const response = await axios.get(
                    `https://api.twitch.tv/helix/streams?user_login=${user}`,
                    {
                        headers: {
                            "Client-ID": clientId,
                            Authorization: "Bearer "
                        }
                    }
                )

                if (response.data.data.length > 0) {
                    liveUsers.push(user)
                }

                if (liveUsers.length >= 3) {
                    break
                }
            }

            setLiveUsers(liveUsers)
        }

        fetchLiveUsers()
    }, [users])

    return (
        <div>
            {liveUsers.map((user) => (
                <TwitchStream key={user} channel={user} />
            ))}
        </div>
    )
}

export default UserStreams
