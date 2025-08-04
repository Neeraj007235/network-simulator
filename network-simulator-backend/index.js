import express from 'express';
import cors from 'cors';
import simulationRoutes from './routes/simulationRoutes.js';  // <-- note the .js extension

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', simulationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
