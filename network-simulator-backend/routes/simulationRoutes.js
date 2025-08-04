import express from 'express';
import { getSimulationState, startSimulation } from '../controllers/simulationController.js';

const router = express.Router();

router.get('/state', getSimulationState);
router.post('/start', startSimulation);

export default router;
