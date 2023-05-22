import { Routes, Route } from "react-router-dom"
import Home from "../../pages/Home"
import Edition from "../../pages/Edition"
import Participants from "../../pages/Participants"
import Building from "../../pages/Building"
import TwitchCallback from "../twitch/TwitchCallBack"

function Index() {
    return (
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/:id" exact="true" element={<Edition />} />
            <Route
                path="/participants"
                exact="true"
                element={<Participants />}
            />
            <Route path="/building" exact="true" element={<Building />} />
            <Route path="/auth/twitch/callback" element={<TwitchCallback />} />
        </Routes>
    )
}

export default Index
