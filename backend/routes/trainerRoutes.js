import express from 'express';
import {
  createTrainer,
  deleteTrainer,
  editTrainer,
  getAllTrainers,
  getTrainer,
} from '../controller/trainerController.js';
import { protect } from '../controller/authenticationController.js';
const router = express.Router();

router.route('/').get(protect, getAllTrainers).post(protect, createTrainer);
router
  .route('/:id')
  .get(protect, getTrainer)
  .patch(protect, editTrainer)
  .delete(deleteTrainer);

export default router;
