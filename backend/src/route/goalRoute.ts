import express from 'express';
import { setGoals, getGoals } from '../controller/goalController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/goals',       auth, setGoals); 
router.get('/goals/:userId', auth,  getGoals); 

export default router;