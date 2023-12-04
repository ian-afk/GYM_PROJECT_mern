import express from 'express';
import {
  createReport,
  deleteReport,
  editReport,
  getAllReports,
  getReport,
} from '../controller/reportController.js';

const router = express.Router();

router.route('/').get(getAllReports).post(createReport);
router.route('/:id').get(getReport).patch(editReport).delete(deleteReport);

export default router;
