const express = require('express');
const { getEventsStudent } = require('../controllers/getEventsStudent');
const router = express.Router();

router.get('/getEventsStudent/:specialty', getEventsStudent);

module.exports = router;