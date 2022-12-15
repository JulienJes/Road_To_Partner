const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.ctrl');
const userCtrl = require('../controllers/user.ctrl');

// Authentification
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logOut);

// User DB
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;