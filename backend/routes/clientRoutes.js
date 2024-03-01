import express from 'express';
import {
  createClient,
  deleteClient,
  editClient,
  getAllClient,
  getClient,
} from '../controller/clientController.js';
import { protect } from '../controller/authenticationController.js';

const router = express.Router();

router.route('/').get(protect, getAllClient).post(protect, createClient);
router
  .route('/:id')
  .get(protect, getClient)
  .patch(protect, editClient)
  .delete(protect, deleteClient);

export default router;
