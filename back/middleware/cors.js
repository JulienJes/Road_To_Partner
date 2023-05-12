const cors = require("cors");

const corsMiddleware = (req, res, next) => {
    cors({
        origin: `http://localhost:${process.env.PORT_FRONT}`,
        credentials: false
    })(req, res, () => {
        next();
    });
};

module.exports = corsMiddleware;