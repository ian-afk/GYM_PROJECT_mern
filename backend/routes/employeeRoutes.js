import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
  getEmployee,
} from '../controller/employeeController.js';

const router = express.Router();

router.route('/').get(getAllEmployees).post(createEmployee);
router
  .route('/:id')
  .get(getEmployee)
  .patch(editEmployee)
  .delete(deleteEmployee);

export default router;
