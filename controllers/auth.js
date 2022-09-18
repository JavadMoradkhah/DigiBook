const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const { UserSchema, LoginSchema } = require('../schemas/User');

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.log('ENV_MISSING: JWT_SECRET');
  process.exit(1);
}

exports.register = async (req, res, next) => {
  try {
    const validation = UserSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let user = await User.create(req.body);

    user = user.toJSON();

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ status: 'success', data: { token, user } });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const validation = LoginSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return next(new AppError(400, 'fail', 'The email or password is invalid!'));
    }

    user = user.toJSON();

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return next(new AppError(400, 'fail', 'The email or password is invalid!'));
    }

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ status: 'success', data: { token, user } });
  } catch (error) {
    next(error);
  }
};
