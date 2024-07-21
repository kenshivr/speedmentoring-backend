const express = require('express');
const { searchEmail } = require('../controllers/search.js');
const router = express.Router();

router.post('/buscar', searchEmail);

module.exports = router;