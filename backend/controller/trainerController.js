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
  const trainer = await Trainer.findById(req.params.id);

  if (!trainer) {
    return res.status(404).json({ message: 'No trainer found with the id' });
  }
  res.status(200).json({
    status: 'success',
    trainer,
  });
});

export const editTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Trainer Updated successfully',
    trainer,
  });
});

export const deleteTrainer = catchAsync(async (req, res, next) => {
  const trainer = await Trainer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Trainer delete successfully',
  });
});
