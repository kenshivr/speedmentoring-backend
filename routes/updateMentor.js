import { Router } from 'express';
const router = Router();
import { getUserProfile, updateProfile } from '../controllers/updateMentorController';

// Ruta para obtener el perfil del usuario
router.get('/getUserProfile/:userId', getUserProfile);

// Ruta para actualizar el perfil del usuario
router.post('/updateProfileMentor', updateProfile);

export default router;