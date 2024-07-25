const express = require('express');
const { getMentors } = require('../controllers/getMentors');
const router = express.Router();

router.get('/mentors', getMentors);

module.exports = router;