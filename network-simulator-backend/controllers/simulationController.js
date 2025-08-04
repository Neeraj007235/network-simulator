import { getState, simulateStep } from '../services/simulationEngine.js';

let interval;

const getSimulationState = (req, res) => {
  res.json(getState());
};

const startSimulation = (req, res) => {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    simulateStep();
  }, 1000); // 1 second steps

  res.json({ message: 'Simulation started' });
};

export { getSimulationState, startSimulation };
