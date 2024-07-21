const express = require('express');
const { getEvent } = require('../controllers/getEventAdmin');
const router = express.Router();

router.get('/getEvent/:eventId', getEvent);

module.exports = router;