import Schedule from '../models/ScheduleModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createSchedule = catchAsync(async (req, res, next) => {
  const newSchedule = await Schedule.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Schedule successfully created',
    schedule: newSchedule,
  });
});

export const getAllSchedules = catchAsync(async (req, res, next) => {
  const schedules = await Schedule.find();

  res.status(200).json({
    status: 'success',
    totalResult: schedules.length,
    schedules,
  });
});

export const getSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    schedule,
  });
});

export const editSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'schedule updated successfully',
    schedule,
  });
});

export const deleteSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'schedule deleted successfully',
  });
});
