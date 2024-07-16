import { Router } from 'express';
const router = Router();
const { getUserProfile, updateProfile } = require('../controllers/updateMentorController.js');

// Ruta para obtener el perfil del usuario
router.get('/getUserProfile/:userId', getUserProfile);

// Ruta para actualizar el perfil del usuario
router.post('/updateProfileMentor', updateProfile);

export default router;