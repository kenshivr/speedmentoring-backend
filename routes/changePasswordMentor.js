import { Router } from 'express';
const router = Router();
const { changePass } = require('../controllers/changePasswordMentorController').default;

router.put('/changePassMentor', changePass);

export default router;