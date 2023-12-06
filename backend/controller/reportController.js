import Report from '../models/ReportModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createReport = catchAsync(async (req, res, next) => {
  const newReport = await Report.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Report created successfully',
    report: newReport,
  });
});

export const getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Report.find();

  res.status(200).json({
    status: 'success',
    totalResult: reports.length,
    reports,
  });
});

export const getReport = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    return next(new AppError('No report found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    report,
  });
});

export const editReport = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!report) {
    return next(new AppError('No report found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Report updated successfully',
    report,
  });
});

export const deleteReport = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndDelete(req.params.id);

  if (!report) {
    return next(new AppError('No report found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Report updated successfully',
  });
});
