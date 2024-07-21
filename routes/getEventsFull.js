const express = require('express');
const { getEventsFull } = require('../controllers/getEventsFull.js');
const router = express.Router();

router.get('/getEventsFull', getEventsFull);

module.exports = router;