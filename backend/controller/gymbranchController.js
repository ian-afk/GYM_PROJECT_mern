import GymBranches from '../models/GymbranchModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createGym = catchAsync(async (req, res, next) => {
  const gymbranch = await GymBranches.create(req.body);

  // TODO ERROR DUPLICATE EMAIL HANDLING
  res.status(201).json({
    status: 'success',
    message: 'Gymbranch Created Succesfully',
    gymbranch,
  });
});

export const getAllGymBranches = catchAsync(async (req, res, next) => {
  const gymbranches = await GymBranches.find();

  res.status(200).json({
    status: 'success',
    totalResult: gymbranches.length,
    gymbranches,
  });
});

export const getGymBranch = catchAsync(async (req, res, next) => {
  const gymbranch = await GymBranches.findById(req.params.id);

  if (!gymbranch) {
    return next(new AppError('No gymbranch found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    gymbranch,
  });
});

export const editGymBranch = catchAsync(async (req, res, next) => {
  const gymbranch = await GymBranches.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!gymbranch) {
    return next(new AppError('No gymbranch found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Gym branch successfully updated',
    gymbranch,
  });
});

export const deleteGymBranch = catchAsync(async (req, res, next) => {
  const gymbranch = await GymBranches.findByIdAndDelete(req.params.id);

  if (!gymbranch) {
    return next(new AppError('No gymbranch found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Gymbranch deleted successfully',
  });
});
