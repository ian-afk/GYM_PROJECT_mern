import express from 'express';
import employeeRouter from './routes/employeeRoutes.js';
import trainerRouter from './routes/trainerRoutes.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send({ message: 'WELCOME TO EL AMAGROS EL' });
});

app.use('/api/employees', employeeRouter);
app.use('/api/trainers', trainerRouter);

export default app;
