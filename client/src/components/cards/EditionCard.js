import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import Loading from "../Loading"
import { formatDate } from "../../utils/dateUtils"

const baseUrl = process.env.REACT_APP_API_URL

function EditionCard() {
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
            {editions.map((edition, index) => {
                let fadeIn = `fadein--${index + 1}`
                const dateEventString = formatDate(edition.date)
                const dateInscription = new Date(edition.inscription)
                const dateInscriptionString = formatDate(edition.inscription)
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
                                    : dateInscriptionString}
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
        </>
    )
}

export default EditionCard
