import Shop from '../models/ShopModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Shop.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Product Created Successfully',
    product,
  });
});

export const getAllShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.find();

  res.status(200).json({
    status: 'success',
    items: shop,
  });
});
