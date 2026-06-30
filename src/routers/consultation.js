import { Router } from 'express';
import { submitConsultation } from '../controllers/consultationController.js';
import { submitRateLimit } from '../middleware/submitRateLimit.js';

const router = Router();

router.post('/submit', submitRateLimit, submitConsultation);

export default router;
