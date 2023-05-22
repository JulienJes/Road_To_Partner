import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"

const baseUrl = process.env.REACT_APP_API_URL

function Editions() {
    const [editions, setEditions] = useState("")

    useEffect(() => {
        const fetchEditionData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/edition/`, {
                    withCredentials: true
                })
                const sortedEditions = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                )
                setEditions(sortedEditions)
                return sortedEditions
            } catch (error) {
                console.error(
                    "Erreur dans la récupération des données des éditions",
                    error
                )
            }
        }
        fetchEditionData()
    }, [])

    if (!editions) {
        return <Loading />
    }

    return (
        <>
            <section className="editions">
                <div className="list">
                    {editions.map((edition, index) => {
                        let fadeIn = `fadein--${index + 1}`
                        const date = new Date(edition.inscription)
                        const options = {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                        const dateToString = date.toLocaleString("fr-FR", {
                            ...options,
                            timeZone: "Europe/Paris"
                        })
                        const dateString =
                            dateToString
                                .replace(":", "h")
                                .charAt(0)
                                .toUpperCase() + dateToString.slice(1)

                        return (
                            <div className={`card ${fadeIn}`} key={edition._id}>
                                <div className="card-title">
                                    <h3>{edition.name}</h3>
                                </div>
                                <div className="card-dates">
                                    <p>{dateString}</p>
                                    <p className="inscriptions-over">
                                        {date.getTime() < Date.now()
                                            ? "Évènement terminé"
                                            : dateString}
                                    </p>
                                </div>
                                <div className="card-btn">
                                    <NavLink
                                        exact="true"
                                        to={`/${edition._id}`}
                                        className="btn"
                                    >
                                        Consulter
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Editions
