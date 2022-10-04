const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const { UserUpdateSchema } = require('../schemas/User');

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.log('ENV_MISSING: JWT_SECRET');
  process.exit(1);
}

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const validation = UserUpdateSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let user = await User.findOne({ where: { email: req.user.email } });

    if (!user) {
      return next(new AppError(400, 'fail', 'The email of the given token is invalid!'));
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    Object.assign(user, req.body);

    user = (await user.save()).toJSON();

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ status: 'success', data: { token, user } });
  } catch (error) {
    next(error);
  }
};
