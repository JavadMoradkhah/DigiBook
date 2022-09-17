/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const authorization = req.header('authorization');
  if (!authorization) {
    return next(new AppError(401, 'fail', 'The authorization token is required.'));
  }

  let token = authorization.match(/Bearer (.*)/);
  if (!token) {
    return next(new AppError(400, 'fail', 'The given token format is invalid.'));
  }

  token = token[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError(400, 'fail', 'The given token is invalid.'));
    }

    req.user = decoded;

    next();
  });
};
