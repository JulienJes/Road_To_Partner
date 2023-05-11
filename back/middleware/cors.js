const cors = require("cors");

const corsMiddleware = cors({
    origin: `http://localhost:${process.env.PORT_FRONT}`,
    credentials: true,
});

module.exports = corsMiddleware;