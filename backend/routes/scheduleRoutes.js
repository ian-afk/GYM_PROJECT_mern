import express from 'express';
import {
  createSchedule,
  deleteSchedule,
  editSchedule,
  getAllSchedules,
  getSchedule,
} from '../controller/scheduleController.js';

const router = express.Router();

router.route('/').get(getAllSchedules).post(createSchedule);
router
  .route('/:id')
  .get(getSchedule)
  .patch(editSchedule)
  .delete(deleteSchedule);

export default router;
