import { NavLink } from "react-router-dom";
import Editions from "../components/Editions";

function Home () {
    return (
        <>
        <section className="home">
            <div className="title">
                <h2>Bienvenue !</h2>
            </div>
            <div className="catchphrase">
                <p>Road To Partner ou RTP pour les intimes est une compétition sur Twitch où un maximum de 100 streamers s'affrontent, le tout casté par JowyTV. Tous les participants doivent s'abonner et raid la chaîne Twitch du vainqueur d'une édition. <br/>
                RTP est destiné aux streameurs affiliés qui ambitionnent de passer Partner Twitch.</p>
            </div>
        </section>
        <Editions />
        </>
    );
};

export default Home;