const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError(400, 'fail', 'The request body is empty!'));
  }

  next();
};
