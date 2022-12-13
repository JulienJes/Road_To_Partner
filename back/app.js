const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.w7tuj.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))
;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT_FRONT}`);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Parsers
app.use(express.json());

// Jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Routes
app.use('/api/user', userRoutes);

module.exports = app;