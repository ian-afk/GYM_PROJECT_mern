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
  const schedules = await Schedule.find().populate({
    path: 'trainer',
    select: 'experties _id',
  });

  res.status(200).json({
    status: 'success',
    totalResult: schedules.length,
    schedules,
  });
});

export const getSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id)
    .populate({
      path: 'trainer',
      select: 'experties _id',
    })
    .populate({
      path: 'clients',
      select: 'firstName lastName _id',
    });

  // this.populate({
  //   path: 'trainer',
  //   select: 'experties _id',
  // }).populate({
  //   path: 'clients',
  //   select: 'firstName _id',
  // });

  if (!schedule) {
    return next(new AppError('No schedule found with that ID ', 404));
  }

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

  if (!schedule) {
    return next(new AppError('No schedule found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'schedule updated successfully',
    schedule,
  });
});

export const deleteSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);

  if (!schedule) {
    return next(new AppError('No schedule found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'schedule deleted successfully',
  });
});
