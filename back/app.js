const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

const corsMiddleware = require('./middleware/cors');

const editionRoutes = require('./routes/edition.routes');
const userRoutes = require('./routes/user.routes')

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.rgod4od.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT_FRONT}`); 
//   res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(corsMiddleware);

// Parsers
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/edition', editionRoutes);

module.exports = app;