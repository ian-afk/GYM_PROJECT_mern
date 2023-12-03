import express from 'express';
import {
  createClient,
  deleteClient,
  editClient,
  getAllClient,
  getClient,
} from '../controller/clientController.js';

const router = express.Router();

router.route('/').get(getAllClient).post(createClient);
router.route('/:id').get(getClient).patch(editClient).delete(deleteClient);

export default router;
