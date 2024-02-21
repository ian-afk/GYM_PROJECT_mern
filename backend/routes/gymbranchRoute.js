import express from 'express';
import {
  createGym,
  deleteGymBranch,
  editGymBranch,
  getAllGymBranches,
  getGymBranch,
} from '../controller/gymbranchController.js';
import { protect } from '../controller/authenticationController.js';

const router = express.Router();

router.route('/').get(protect, getAllGymBranches).post(protect, createGym);
router
  .route('/:id')
  .get(protect, getGymBranch)
  .patch(protect, editGymBranch)
  .delete(protect, deleteGymBranch);

export default router;
