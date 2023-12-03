import express from 'express';
import {
  createPayment,
  deletePayment,
  editPayment,
  getAllPayments,
  getPayment,
} from '../controller/paymentController.js';

const router = express.Router();

router.route('/').get(getAllPayments).post(createPayment);
router.route('/:id').get(getPayment).patch(editPayment).delete(deletePayment);

export default router;
