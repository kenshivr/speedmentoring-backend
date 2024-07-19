const express = require('express');
const { searchEmail } = require('../controllers/searchController');
const router = express.Router();

router.post('/buscar', searchEmail);

module.exports = router;