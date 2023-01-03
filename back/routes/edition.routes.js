const express = require('express');
const router = express.Router();

const editionCtrl = require('../controllers/edition.ctrl');

// User DB
router.get('/', editionCtrl.readEdition);
router.post('/', editionCtrl.createEdition);

module.exports = router;