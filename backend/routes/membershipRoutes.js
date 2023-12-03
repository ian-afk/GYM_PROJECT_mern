import express from 'express';
import {
  createMembership,
  deleteMembership,
  editMembership,
  getAllMembership,
  getMembership,
} from '../controller/membershipController.js';

const router = express.Router();

router.route('/').get(getAllMembership).post(createMembership);
router
  .route('/:id')
  .get(getMembership)
  .patch(editMembership)
  .delete(deleteMembership);

export default router;
