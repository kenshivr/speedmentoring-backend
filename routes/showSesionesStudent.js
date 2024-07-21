const express = require('express');
const router = express.Router();
const showSesionesStudentController = require('../controllers/showSesionesStudent');

router.get('/showSesionesStudent/:id', showSesionesStudentController);

module.exports = router;