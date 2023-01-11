import {NavLink} from "react-router-dom";

function Edition2 () {
    return (
        <>
        <div className="edition">
            <h2>RTP#2 - Fall Guys</h2>
            <div className="edition-sub">
                <section className="presentation">
                    <h3>Présentation</h3>
                    <p>Jusqu'à 60 streameurs vont s'affronter sur Fall Guys, tous affiliés.<br/>
                    8 parties sur des émissions solo (peut changer d'ici là).<br/>
                    Vous gagnez 1 point à chaque manche passée sauf pour la phase finale qui vous octroie 2 points. Gagner la partie rapporte 3 points.<br/>
                    Le cumule des points de chaque partie établie un score total et donc le classement de l'édition.<br/>
                    Les participants doivent s'abonner (ou offrir un abonnement) et raid le gagnant!<br/>
                    Il est obligatoire de streamer les parties<br/>
                    Le jeu est cross-play et gratuit!</p>
                </section>
                <aside className="informations">
                    <div className="informations-date">
                        <h3>Dates</h3>
                        <p>27 janvier 2023 à 20h00</p>
                        <p>Fin des inscriptions le 25 janvier 2023 inclus!</p>
                    </div>
                    <div className="informations-inscription">
                        <h3>Conditions d'inscription</h3>
                        <p>Être affilié Twitch</p>
                        <h3>Pour s'inscrire:</h3>
                        <p>Rejoignez ce <a href="https://discord.gg/f9mQ5t9Suv" title="Discord" target="_blank" rel="noopener noreferrer" className="linkastext">Discord</a> et laissez-vous guider!</p>
                        <p>Une fois votre candidature acceptée, le rôle "Streamer" vous sera assigné sur Discord et vous aurez accès à des chans réservés aux joueurs pour faciliter l'organisation.</p>
                        <p>Votre communauté peut rejoindre le Discord et participer à la vie de la compétition!</p>
                    </div>
                </aside>
            </div>
        </div>
        </>
    );
};

export default Edition2;