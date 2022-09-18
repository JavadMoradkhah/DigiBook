const Joi = require('joi');

exports.OrderSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
  book_id: Joi.number().integer().required(),
});

exports.OrderUpdateSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'CONFIRMED', 'REJECTED', 'SENT', 'DELIVERED').required(),
});
