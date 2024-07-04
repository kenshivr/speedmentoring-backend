const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile } = require('../controllers/updateMentorController');

// Ruta para obtener el perfil del usuario
router.get('/getUserProfile/:userId', getUserProfile);

// Ruta para actualizar el perfil del usuario
router.post('/updateProfileMentor', updateProfile);

module.exports = router;