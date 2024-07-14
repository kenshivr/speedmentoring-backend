const express = require('express');
const { getEventsFull } = require('../controllers/getEventsFull');
const router = express.Router();

router.get('/getEventsFull', getEventsFull);

module.exports = router;