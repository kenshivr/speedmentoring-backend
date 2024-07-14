const express = require('express');
const router = express.Router();
const showSesionesMentorController = require('../controllers/showSesionesMentorController');

router.get('/showSesionesMentor/:id', showSesionesMentorController);

export default router;