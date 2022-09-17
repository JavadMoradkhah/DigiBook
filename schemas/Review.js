/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const schema = {
  comment: Joi.string().max(1000),
};

exports.ReviewSchema = Joi.object({
  book_id: Joi.number().integer().required(),
  rating: Joi.number().min(0).max(5).required(),
  comment: schema.comment.required(),
});

exports.ReviewUpdateSchema = Joi.object(schema);
