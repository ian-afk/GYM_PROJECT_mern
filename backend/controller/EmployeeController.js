import Employee from '../models/EmployeeModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createEmployee = catchAsync(async (req, res, next) => {
  const newEmployee = await Employee.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      employee: newEmployee,
    },
  });
});

export const getAllEmployees = catchAsync(async (req, res, next) => {
  const employees = await Employee.find();

  res.status(200).json({
    status: 'success',
    totalResult: employees.length,
    employees,
  });
});

export const getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('No employee found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    employee,
  });
});

export const editEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!employee) {
    return next(new AppError('No employee found with that ID ', 404));
  }
  res.status(200).json({
    status: 'success',
    employee,
  });
});

export const deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    return next(new AppError('No employee found with that ID ', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Employee deleted successfully',
  });
});
