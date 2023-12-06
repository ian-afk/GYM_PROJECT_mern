import Membership from '../models/membershipModel.js';
import catchAsync from '../utils/catchAsync.js';

export const createMembership = catchAsync(async (req, res, next) => {
  const newMembership = await Membership.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Membership successfully created',
    membership: newMembership,
  });
});

export const getAllMembership = catchAsync(async (req, res, next) => {
  const memberships = await Membership.find();

  res.status(200).json({
    status: 'success',
    totalResult: memberships.length,
    memberships,
  });
});

export const getMembership = catchAsync(async (req, res, next) => {
  const membership = await Membership.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    membership,
  });
});

export const editMembership = catchAsync(async (req, res, next) => {
  const membership = await Membership.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Membership updated successfully',
    membership,
  });
});

export const deleteMembership = catchAsync(async (req, res, next) => {
  await Membership.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Membership deleted successfully ',
  });
});
