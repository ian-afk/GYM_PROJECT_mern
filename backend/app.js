import express from 'express';
import dotenv from 'dotenv';

import trainerRouter from './routes/trainerRoutes.js';
dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send({ message: 'WELCOME TO EL AMAGROS EL' });
});

app.get('/employees', (req, res) => {
  console.log(req);
});

app.use('/api/trainers', trainerRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
