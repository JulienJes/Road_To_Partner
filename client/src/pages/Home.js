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
                <p>Road To Partner ou RTP pour les intimes est une compétition sur Twitch où un maximum de 100 streamers s'affrontent, le tout organisé et commenté par JowyTV. Tous les participant doivent s'abonner et raid la chaîne Twitch du vainqueur d'une édition. <br/>
                RTP est né de l'idée qu'il est très difficile pour un affilié de faire grandir son audience (du fait de l'effet de noyade avec plus de 9 millions de chaînes existantes sur Twitch et d'une forte concentration d'audience par les streamers les plus connus).<br/>
                RTP existe donc pour créer une effervescence parmi les streamers ambitieux, souhaitant faire du streaming leur métier mais aussi pour aider l'un d'eux à augmenter ses statitiques en vue du partnership Twitch!</p>
            </div>
        </section>
        <Editions />
        </>
    );
};

export default Home;