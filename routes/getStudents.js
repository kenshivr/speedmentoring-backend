const express = require('express');
const { getStudents } = require('../controllers/getStudents.js');
const router = express.Router();

router.get('/students', getStudents);

module.exports = router;