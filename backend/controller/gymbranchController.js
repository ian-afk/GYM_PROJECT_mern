import GymBranches from '../models/GymbranchModel.js';
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

  res.status(200).json({
    status: 'success',
    message: 'Gym branch successfully updated',
    gymbranch,
  });
});

export const deleteGymBranch = catchAsync(async (req, res, next) => {
  await GymBranches.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Gymbranch deleted successfully',
  });
});
