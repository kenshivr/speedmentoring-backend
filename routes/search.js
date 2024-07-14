import express from 'express';
import { searchEmail } from '../controllers/searchController';
const router = express.Router();

router.post('/buscar', searchEmail);

export default router;