/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const schema = {
  email: Joi.string().min(5).max(50).email().required(),
  password: Joi.string().min(8).max(50).required(),
};

const UserSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(2)
    .max(50)
    .required(),
  lastName: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(2)
    .max(50)
    .required(),
  ...schema,
});

const LoginSchema = Joi.object(schema);

exports.UserSchema = UserSchema;
exports.LoginSchema = LoginSchema;
