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

router.route('/').get(protect, getAllEmployees).post(protect, createEmployee);
router
  .route('/:id')
  .get(protect, getEmployee)
  .patch(protect, editEmployee)
  .delete(protect, deleteEmployee);

export default router;
