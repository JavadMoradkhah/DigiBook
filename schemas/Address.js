const Joi = require('joi');

const schema = {
  country: Joi.string().max(20),
  state: Joi.string().max(20),
  city: Joi.string().max(20),
  street: Joi.string().max(100),
  zipcode: Joi.string().max(50),
  telephone: Joi.string().max(15),
  additional_info: Joi.string().max(500),
};

exports.AddressSchema = {
  country: schema.country.required(),
  state: schema.state.required(),
  city: schema.city.required(),
  street: schema.street.required(),
  zipcode: schema.zipcode.required(),
  telephone: schema.telephone.required(),
  additional_info: schema.additional_info,
};

exports.AddressUpdateSchema = Joi.object(schema);
