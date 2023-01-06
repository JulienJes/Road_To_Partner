import {Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home';
import Edition from '../../pages/Edition';
import Edition2 from '../../pages/Edition2';
import Building from '../../pages/Building';

function Index() {
    return (
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/RTP1" exact="true" element={<Edition />} />
            <Route path="/RTP2" exact="true" element={<Edition2 />} />
            <Route path="/building" exact="true" element={<Building />} />
        </Routes>
    );
};

export default Index;