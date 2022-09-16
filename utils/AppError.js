class AppError extends Error {
  constructor(statusCode, status = 'fail', message = '') {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

module.exports = AppError;
