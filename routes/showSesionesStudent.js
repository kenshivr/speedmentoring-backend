const express = require('express');
const router = express.Router();
const showSesionesStudentController = require('../controllers/showSesionesStudentController');

router.get('/showSesionesStudent/:id', showSesionesStudentController);

module.exports = router;