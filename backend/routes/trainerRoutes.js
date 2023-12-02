import express from 'express';
import {
  createTrainer,
  deleteTrainer,
  editTrainer,
  getAllTrainers,
  getTrainer,
} from '../controller/trainerController.js';

const router = express.Router();

router.route('/').get(getAllTrainers).post(createTrainer);
router.route('/:id').get(getTrainer).patch(editTrainer).delete(deleteTrainer);

export default router;
