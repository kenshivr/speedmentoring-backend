const express = require('express');
const router = express.Router();
const { updateProfileMentor } = require('../controllers/updateProfileMentor.js');

// Ruta para actualizar el perfil del usuario
router.post('/updateProfileMentor/:userId', updateProfileMentor);

module.exports = router;