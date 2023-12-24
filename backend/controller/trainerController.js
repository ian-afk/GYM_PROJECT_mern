import Trainer from '../models/TrainerModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createTrainer = catchAsync(async (req, res, next) => {
  const newTrainer = await Trainer.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      trainer: newTrainer,
    },
  });
});

export const getAllTrainers = catchAsync(async (req, res, next) => {
  const trainers = await Trainer.find();

  res.status(200).json({
    status: 'success',
    totalResult: trainers.length,
    trainers,
  });
});

export const getTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findById(req.params.id).populate('schedules');

  if (!trainer) {
    return next(new AppError('No trainer found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    trainer: {
      ...trainer._doc,
      ...trainer.$$populatedVirtuals,
    },
  });
});

export const editTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!trainer) {
    return next(new AppError('No trainer found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Trainer Updated successfully',
    trainer,
  });
});

export const deleteTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findByIdAndDelete(req.params.id);

  if (!trainer) {
    return next(new AppError('No trainer found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Trainer delete successfully',
  });
});
