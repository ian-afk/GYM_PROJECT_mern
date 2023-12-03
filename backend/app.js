import express from 'express';
import employeeRouter from './routes/employeeRoutes.js';
import trainerRouter from './routes/trainerRoutes.js';
import gymbranchRouter from './routes/gymbranchRoute.js';
import scheduleRouter from './routes/scheduleRoutes.js';
import membershipRouter from './routes/membershipRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import clientRouter from './routes/clientRoutes.js';
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
app.use('/api/gymbranches', gymbranchRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/clients', clientRouter);

export default app;
