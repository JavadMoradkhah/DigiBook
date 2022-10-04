/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const fields = {
  name: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(2)
    .max(50),
  email: Joi.string().min(5).max(50).email(),
  password: Joi.string().min(8).max(50),
};

const UserSchema = Joi.object({
  first_name: fields.name.required(),
  last_name: fields.name.required(),
  email: fields.email.required(),
  password: fields.password.required(),
});

const LoginSchema = Joi.object({
  email: fields.email.required(),
  password: fields.password.required(),
});

const UserUpdateSchema = Joi.object({
  first_name: fields.name,
  last_name: fields.name,
  password: fields.password,
});

exports.UserSchema = UserSchema;
exports.LoginSchema = LoginSchema;
exports.UserUpdateSchema = UserUpdateSchema;
