import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import simulationRoutes from './routes/simulationRoutes.js';  // <-- note the .js extension
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use('/api', simulationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../network-simulator-frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../network-simulator-frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
