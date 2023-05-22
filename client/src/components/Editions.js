import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"

const baseUrl = process.env.REACT_APP_API_URL

function Editions() {
    const [editions, setEditions] = useState("")

    useEffect(() => {
        const fetchEditionsData = async () => {
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
        fetchEditionsData()
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
                        const dateOptions = {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                        const dateEvent = new Date(edition.date)
                        const dateEventToString = dateEvent.toLocaleString(
                            "fr-FR",
                            {
                                ...dateOptions
                            }
                        )
                        const dateEventString =
                            dateEventToString
                                .replace(":", "h")
                                .charAt(0)
                                .toUpperCase() + dateEventToString.slice(1)
                        const dateInscription = new Date(edition.inscription)
                        const dateInscriptionToString =
                            dateInscription.toLocaleString("fr-FR", {
                                ...dateOptions
                            })
                        const dateString =
                            dateInscriptionToString
                                .replace(":", "h")
                                .charAt(0)
                                .toUpperCase() +
                            dateInscriptionToString.slice(1)
                        return (
                            <div className={`card ${fadeIn}`} key={edition._id}>
                                <div className="card-title">
                                    <h3>{edition.name}</h3>
                                </div>
                                <div className="card-dates">
                                    <p>{dateEventString}</p>
                                    <p className="inscriptions-over">
                                        {dateInscription.getTime() < Date.now()
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
