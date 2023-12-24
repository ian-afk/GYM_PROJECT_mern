import Client from '../models/ClientModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createClient = catchAsync(async (req, res, next) => {
  const newClient = await Client.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Client created successfully',
    client: newClient,
  });
});

export const getAllClient = catchAsync(async (req, res, next) => {
  const clients = await Client.find();

  res.status(200).json({
    status: 'success',
    totalResult: clients.length,
    clients,
  });
});

export const getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate('schedules');

  if (!client) {
    return next(new AppError('No client found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    client: {
      ...client._doc,
      ...client.$$populatedVirtuals,
    },
  });
});

export const editClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!client) {
    return next(new AppError('No client found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Client updated successfully',
    client,
  });
});

export const deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return next(new AppError('No client found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Client deleted successfully',
  });
});
