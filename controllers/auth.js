const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('sequelize');
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
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let user = await User.create(req.body);

    user = user.toJSON();

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ status: 'success', data: { token, user } });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ status: 'fail', message: 'Please try another email.' });
    }
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const validation = LoginSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    const user = await User.findOne({ where: { email: req.body.email }, raw: true });

    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'The email or password is invalid!' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ status: 'fail', message: 'The email or password is invalid!' });
    }

    delete user.password;

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ status: 'success', data: { token, user } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', message: error });
  }
};
