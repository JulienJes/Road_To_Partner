const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.ctrl')
const userCtrl = require('../controllers/user.ctrl');

// Authentification Twitch
router.get('/auth/twitch/callback', authCtrl.twitchCallback);
router.post('/auth/refresh_token', authCtrl.refreshToken);
router.post('/auth/logout', authCtrl.logOut);

// User DB
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;