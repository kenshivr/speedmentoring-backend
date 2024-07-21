const express = require('express');
const { getEventsStudent } = require('../controllers/getEventsStudent.js');
const router = express.Router();

router.get('/getEventsStudent/:specialty', getEventsStudent);

module.exports = router;