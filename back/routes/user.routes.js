const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.ctrl');

// User DB
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

// Authentification Twitch
router.get('/auth/twitch/callback', userCtrl.twitchCallback)

module.exports = router;