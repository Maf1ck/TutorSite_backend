import { Router } from 'express';
import { submitConsultation } from '../controllers/consultationController.js';

const router = Router();

router.post('/submit', submitConsultation);

export default router;
