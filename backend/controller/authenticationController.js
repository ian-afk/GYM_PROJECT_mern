import User from '../models/UserModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'User successfully created',
    data: newUser,
  });
});
