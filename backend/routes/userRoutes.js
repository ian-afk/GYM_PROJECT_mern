import express from 'express';
import { createUser } from '../controller/authenticationController.js';

const router = express.Router();

router.route('/signup').post(createUser);

export default router;
