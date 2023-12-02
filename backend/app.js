import express from 'express';
import employeeRouter from './routes/employeeRoutes.js';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send({ message: 'WELCOME TO EL AMAGROS EL' });
});

app.use('/api/employees', employeeRouter);

export default app;
