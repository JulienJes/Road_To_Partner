import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import { formatDate } from "../utils/dateUtils"

const baseUrl = process.env.REACT_APP_API_URL

function Edition() {
    const { id } = useParams()
    const [edition, setEdition] = useState("")

    const dateEventString = formatDate(edition.date)
    const dateInscription = new Date(edition.inscription)
    const dateInscriptionString = formatDate(edition.inscription)

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
        return <Loading />
    }

    return (
        <>
            <div className="edition">
                <h2>{edition.name}</h2>
                <div className="edition-sub">
                    <section className="presentation">
                        <h3>Présentation</h3>
                        {edition.presentation
                            .split(/[.!?]/)
                            .filter((sentence) => sentence !== "")
                            .map((sentence, index) => (
                                <p key={index}>{sentence.trim()}.</p>
                            ))}
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
                                    : dateInscriptionString}
                            </strong>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Edition
