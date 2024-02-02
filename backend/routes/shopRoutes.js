import express from 'express';
import { createProduct, getAllShop } from '../controller/shopController.js';

const router = express.Router();

router.route('/').get(getAllShop).post(createProduct);

export default router;
