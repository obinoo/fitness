import express from 'express';
import { createPlan, deletes, getWorkoutId, getWorkouts, updatePlan } from '../controller/workOutController';
import auth from '../middleware/auth';


const router =  express.Router();

router.post('/createplan', auth, createPlan);
router.get('/workouts',    auth, getWorkouts);
router.get('/workout:/id', auth, getWorkoutId);
router.put('/update',      auth, updatePlan)
router.delete('/delete',   auth, deletes)

export default router;