const express = require('express');
const router = express.Router();
const { registerMentor, registerAlumno } = require('../controllers/newUsers');

// Ruta para registrar un nuevo mentor
router.post('/setNewMentor', registerMentor);

// Ruta para registrar un nuevo alumno
router.post('/setNewAlumno', registerAlumno);

module.exports = router;