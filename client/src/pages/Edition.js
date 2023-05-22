import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"

const baseUrl = process.env.REACT_APP_API_URL

function Edition() {
    const { id } = useParams()
    const [edition, setEdition] = useState("")

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }
    const dateEvent = new Date(edition.date)
    const dateEventToString = dateEvent.toLocaleString("fr-FR", {
        ...dateOptions
    })
    const dateEventString =
        dateEventToString.replace(":", "h").charAt(0).toUpperCase() +
        dateEventToString.slice(1)
    const dateInscription = new Date(edition.inscription)
    const dateInscriptionToString = dateInscription.toLocaleString("fr-FR", {
        ...dateOptions
    })
    const dateString =
        dateInscriptionToString.replace(":", "h").charAt(0).toUpperCase() +
        dateInscriptionToString.slice(1)

    useEffect(() => {
        const fetchEditionData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/api/edition/${id}`,
                    {
                        withCredentials: true
                    }
                )
                setEdition(response.data)
                console.log(response.data)
                return response.data
            } catch (error) {
                console.error(
                    "Erreur dans la récupération des données des éditions",
                    error
                )
            }
        }
        fetchEditionData()
    }, [id])

    if (!edition) {
        ;<Loading />
    }

    return (
        <>
            <div className="edition">
                <h2>{edition.name}</h2>
                <div className="edition-sub">
                    <section className="presentation">
                        <h3>Présentation</h3>
                        <p>{edition.presentation}</p>
                    </section>
                    <aside className="informations">
                        <div className="informations-date">
                            <h3>Dates</h3>
                            <p>{dateEventString}</p>
                        </div>
                        <div className="informations-inscription">
                            <h3>Conditions d'inscription</h3>
                            <p>{edition.condition}</p>
                            <h3>Pour s'inscrire:</h3>
                            <strong className="inscriptions-over">
                                {dateInscription.getTime() < Date.now()
                                    ? "Inscriptions terminées !"
                                    : dateString}
                            </strong>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Edition
