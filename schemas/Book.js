const Joi = require('joi');

const schema = {
  title: Joi.string()
    .pattern(/^[A-Z|a-z|\s|:]+$/)
    .min(5)
    .max(255),
  genre_id: Joi.number().integer(),
  description: Joi.string().min(5).max(2000),
  thumbnail_image: Joi.string().min(5).max(255),
  author: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(3)
    .max(50),
  publisher: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(3)
    .max(50),
  copyright_holder: Joi.string()
    .pattern(/^[A-Z|a-z|\s]+$/)
    .min(3)
    .max(50),
  copyright_date: Joi.date(),
};

exports.BookSchema = Joi.object({
  title: schema.title.required(),
  genre_id: schema.genre_id.required(),
  description: schema.description.required(),
  thumbnail_image: schema.thumbnail_image.required(),
  author: schema.author.required(),
  publisher: schema.publisher,
  copyright_holder: schema.copyright_holder,
  copyright_date: schema.copyright_date,
});

exports.BookUpdateSchema = Joi.object(schema);
