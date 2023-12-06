class AppError extends Error {
  // inherit the Error class
  super(message, statusCode) {
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperation = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
