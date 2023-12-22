import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.email}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationFields = (err) => {
  const error = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid Input data: ${error.join('. ')}`;
  return new AppError(message, 400);
};

const handleInvalidToken = () => {
  const message = `Invalid token. Please log in again!`;
  return new AppError(message, 401);
};

const handleExpireToken = () => {
  const message = `You're logged out! Please login.`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { name: err.name, ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationFields(error);
    if (error.name === 'JsonWebTokenError') error = handleInvalidToken();
    if (error.name === 'TokenExpiredError') error = handleExpireToken();
    sendErrorProd(error, req, res);
  }
};
