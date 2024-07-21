const express = require('express');
const router = express.Router();
const showSesionesMentorController = require('../controllers/showSesionesMentor');

router.get('/showSesionesMentor/:id', showSesionesMentorController);

module.exports = router;