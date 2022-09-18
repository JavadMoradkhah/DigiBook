const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  if (!req.user.is_admin) {
    return next(new AppError(403, 'fail', "You don't have permission to access this resource."));
  }

  next();
};
