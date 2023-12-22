import { promisify } from 'util';
import User from '../models/UserModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXP_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    message: 'User successfully created',
    token,
    data: newUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password) {
    return next(new AppError('Plase provide email and password', 400));
  }

  // check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password'); // adding select to access the password field since its disabled in the model as select false

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // return if email pass are okay: sending token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    message: 'Successfully login',
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Check if token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not login! Please login to get access', 401)
    );
  }

  // Validate token

  const decode = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_TOKEN
  );

  // Check if user still exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError('The user beloging to this token does no longer exists', 401)
    );
  }

  // user changed password
  if (currentUser.changedPasswordAt(decode.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }

  next();
});
