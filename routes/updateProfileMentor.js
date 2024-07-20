const express = require('express');
const router = express.Router();
const { updateProfileMentor } = require('../controllers/updateProfileMentorController.js');

// Ruta para actualizar el perfil del usuario
router.post('/updateProfileMentor/:userId', updateProfileMentor);

module.exports = router;