const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  const defaultErrorMessage = 'Something went wrong: Please try again later.';

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message || defaultErrorMessage });
  }

  res.status(500).json({ status: 'error', message: defaultErrorMessage });
};
