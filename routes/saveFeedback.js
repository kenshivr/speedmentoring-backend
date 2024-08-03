const express = require('express');
const { retro } = require('../controllers/saveFeedback');
const router = express.Router();

router.post('/retro', retro);

module.exports = router;