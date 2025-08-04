import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import simulationRoutes from './routes/simulationRoutes.js';  // <-- note the .js extension
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/api', simulationRoutes);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../network-simulator-frontend/dist");

  if (fs.existsSync(distPath)) {
    console.log('Serving frontend from:', distPath);
    app.use(express.static(distPath));

    // Catch-all fallback **without route parsing**
    app.use((req, res, next) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn('Frontend dist folder not found. Skipping static file setup.');
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
