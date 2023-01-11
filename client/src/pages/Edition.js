//import {NavLink} from "react-router-dom";

function Edition () {
    return (
        <>
        <div className="edition">
            <h2>RTP#1 - PUBG</h2>
            <div className="edition-sub">
                <section className="presentation">
                    <h3>Présentation</h3>
                    <p>La première édition de PUBG a regroupé une dizaine de streameurs, tous affiliés<br/>
                    4 parties sur 4 maps différentes (Erangel, Vikendi, Karakhin, Sanhok)<br/>
                    L'apparition des zones était un peu accélérée en début de partie (jusqu'à phase 5 exclue)<br/>
                    Mode FPP<br/>
                    Le classement rapporte des points (100 points pour le premier, 99 pour le second et ainsi de suite)<br/>
                    Les kills aussi (+1 point par kill)<br/>
                    Le cumule des points de chaque partie établie un score total et donc le classement de l'édition<br/>
                    Les participants doivent s'abonner (ou offrir un abonnement) et raid le gagnant!<br/>
                    Chat en emote only à chaque lancement de partie<br/>
                    Version PC du jeu (pas cross-consoles)</p>
                </section>
                <aside className="informations">
                    <div className="informations-date">
                        <h3>Dates</h3>
                        <p>17 novembre 2022 à 20h00</p>
                    </div>
                    <div className="informations-inscription">
                        <h3>Conditions d'inscription</h3>
                        <p>Être affilié Twitch</p>
                        <h3>Pour s'inscrire:</h3>
                        <strong className="inscriptions-over">Inscriptions terminées!</strong>
                        <p>Envoyez un <a href="mailto:jowystreaming@gmail.com" className="linkastext">mail</a> dans lequel vous précisez:</p>
                        <ul>
                            <li>Votre tag PUBG,</li>
                            <li>Votre tag Discord,</li>
                            <li>Le lien de votre chaîne Twitch!</li>
                            <li>Rejoignez ce Discord</li>
                        </ul>
                        <p>Une fois fait, le rôle "RTP" vous sera assigné sur Discord et vous aurez accès à des chans réservés aux joueurs pour faciliter l'organisation.</p>
                    </div>
                </aside>
            </div>
        </div>
        </>
    );
};

export default Edition;