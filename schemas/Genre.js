const Joi = require('joi');

const GenreSchema = Joi.object({
  genre_name: Joi.string()
    .pattern(/^[A-Z|a-z]+$/)
    .min(3)
    .max(50)
    .required(),
});

exports.GenreSchema = GenreSchema;
