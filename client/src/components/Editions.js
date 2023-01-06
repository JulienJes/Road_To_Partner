import {NavLink} from "react-router-dom";

function Editions () {
    return (
        <>
        <section id="editions">
            <div className="list">
                <div className="card">
                    <div className="card-title">
                        <h3>RTP#1 - PUBG</h3>
                    </div>
                    <div className="card-dates">
                        <p>Jeudi 17 novembre 2022 à 20h00</p>
                        <p>Fin des inscriptions le 14 novembre inclus</p>
                    </div>
                    <div className="card-btn">
                        <NavLink exact="true" to="/rtp1" className="btn">Consulter</NavLink>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">
                        <h3>RTP#2 - Fall Guys</h3>
                    </div>
                    <div className="card-dates">
                        <p>Vendredi 27 janvier 2023 à 20h00</p>
                        <p>Fin des inscriptions le 25 janvier inclus</p>
                    </div>
                    <div className="card-btn">
                        <NavLink exact="true" to="/rtp2" className="btn">Consulter</NavLink>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Editions;