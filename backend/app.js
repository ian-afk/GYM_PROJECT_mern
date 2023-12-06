import express from 'express';
import employeeRouter from './routes/employeeRoutes.js';
import trainerRouter from './routes/trainerRoutes.js';
import gymbranchRouter from './routes/gymbranchRoute.js';
import scheduleRouter from './routes/scheduleRoutes.js';
import membershipRouter from './routes/membershipRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

// middleawre
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/employees', employeeRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/gymbranches', gymbranchRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/clients', clientRouter);
app.use('/api/reports', reportRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

export default app;
