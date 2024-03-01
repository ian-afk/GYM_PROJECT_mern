import express from 'express';
import {
  createSchedule,
  deleteSchedule,
  editSchedule,
  getAllSchedules,
  getSchedule,
} from '../controller/scheduleController.js';
import { protect } from '../controller/authenticationController.js';
const router = express.Router();

router.route('/').get(protect, getAllSchedules).post(protect, createSchedule);
router
  .route('/:id')
  .get(protect, getSchedule)
  .patch(protect, editSchedule)
  .delete(protect, deleteSchedule);

export default router;
