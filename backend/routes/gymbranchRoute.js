import express from 'express';
import {
  createGym,
  deleteGymBranch,
  editGymBranch,
  getAllGymBranches,
  getGymBranch,
} from '../controller/gymbranchController.js';

const router = express.Router();

router.route('/').get(getAllGymBranches).post(createGym);
router
  .route('/:id')
  .get(getGymBranch)
  .patch(editGymBranch)
  .delete(deleteGymBranch);

export default router;
