import express from 'express';
import AppError from './utils/appError.js';
import globalErrorHandler from './controller/errorController.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import employeeRouter from './routes/employeeRoutes.js';
import trainerRouter from './routes/trainerRoutes.js';
import gymbranchRouter from './routes/gymbranchRoute.js';
import scheduleRouter from './routes/scheduleRoutes.js';
import membershipRouter from './routes/membershipRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(cors());
// middleawre
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/gymbranches', gymbranchRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/clients', clientRouter);
app.use('/api/reports', reportRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// MIDDLEWARE that catch all error
app.use(globalErrorHandler);
export default app;
