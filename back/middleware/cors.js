const cors = require("cors");

const corsMiddleware = (req, res, next) => {
    cors({
        origin: `http://localhost:${process.env.PORT_FRONT}`,
        credentials: true
    })(req, res, () => {
        next();
    });
};

module.exports = corsMiddleware;