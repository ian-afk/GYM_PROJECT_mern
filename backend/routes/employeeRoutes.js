import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
  getEmployee,
} from '../controller/employeeController.js';
import { protect } from '../controller/authenticationController.js';

const router = express.Router();

router.route('/').get(protect, getAllEmployees).post(createEmployee);
router
  .route('/:id')
  .get(getEmployee)
  .patch(editEmployee)
  .delete(deleteEmployee);

export default router;
