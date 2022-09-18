const AppError = require('../../utils/AppError');
const Genre = require('../../models/Genre');
const { BookSchema } = require('../../schemas/Book');

module.exports = async (req, res, next) => {
  try {
    const validation = BookSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    const genre = await Genre.findByPk(req.body.genre_id);
    if (!genre) {
      return next(new AppError(400, 'fail', 'Invalid genre Id.'));
    }

    next();
  } catch (error) {
    next(error);
  }
};
