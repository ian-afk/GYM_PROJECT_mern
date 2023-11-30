import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
  getEmployee,
} from './controller/employeeController.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send({ message: 'WELCOME TO EL AMAGROS EL' });
});

app.get('/employees', getAllEmployees);
app.post('/employees', createEmployee);

app.get('/employees/:id', getEmployee);
app.patch('/employees/:id', editEmployee);
app.delete('/employees/:id', deleteEmployee);

export default app;
