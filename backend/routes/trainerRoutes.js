import express from 'express';
import { getAllTrainers } from '../controller/trainerController.js';

const router = express.Router();

router.route('/').get(getAllTrainers);

export default router;
