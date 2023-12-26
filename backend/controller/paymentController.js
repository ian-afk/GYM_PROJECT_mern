import Payments from '../models/paymentModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createPayment = catchAsync(async (req, res, next) => {
  const newPayment = await Payments.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Payment created successfully',
    payment: newPayment,
  });
});

export const getAllPayments = catchAsync(async (req, res, next) => {
  const payments = await Payments.find();

  res.status(200).json({
    status: 'success',
    totalResult: payments.length,
    payments,
  });
});

export const getPayment = catchAsync(async (req, res, next) => {
  const payment = await Payments.findById(req.params.id).populate('client');
  const fullName = await payment.client.fullName;
  if (!payment) {
    return next(new AppError('No payment found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    payment: {
      clientName: fullName,
      ...payment._doc,
    },
  });
});

export const editPayment = catchAsync(async (req, res, next) => {
  const payment = await Payments.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!payment) {
    return next(new AppError('No payment found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Payment updated successfully',
    payment,
  });
});

export const deletePayment = catchAsync(async (req, res, next) => {
  const payment = await Payments.findByIdAndDelete(req.params.id);

  if (!payment) {
    return next(new AppError('No payment found with that ID ', 404));
  }

  res.status(201).json({
    status: 'success',
    message: 'Payment deleted Successfully',
  });
});
