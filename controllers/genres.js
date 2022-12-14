const AppError = require('../utils/AppError');
const Genre = require('../models/Genre');
// const Book = require('../models/Book');
const database = require('../startup/database');
const { GenreSchema } = require('../schemas/Genre');

exports.findGenre = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const genre = await Genre.findByPk(id);

    if (!genre) {
      return next(new AppError(404, 'fail', 'The genre not found with the given id!'));
    }

    req.genre = genre;

    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ order: [['name']] });

    res.status(200).json({ status: 'success', data: { genres } });
  } catch (error) {
    next(error);
  }
};

exports.getGenreById = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { genre: req.genre } });
  } catch (error) {
    next(error);
  }
};

exports.getGenreStats = async (req, res, next) => {
  try {
    const subQuery = '(SELECT COUNT(*) FROM books book WHERE book.genre_id = Genre.id)';

    const genres = await Genre.findAll({
      attributes: {
        include: [[database.literal(subQuery), 'books_count']],
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).json({ status: 'success', data: { genres } });
  } catch (error) {
    next(error);
  }
};

exports.createGenre = async (req, res, next) => {
  try {
    const validation = GenreSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    const genre = await Genre.create(req.body);

    res.status(200).json({ status: 'success', data: { genre } });
  } catch (error) {
    next(error);
  }
};

exports.updateGenre = async (req, res, next) => {
  try {
    const validation = GenreSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let { genre } = req;

    genre.name = req.body.name;

    genre = await genre.save();

    res.status(200).json({ status: 'success', data: { genre } });
  } catch (error) {
    next(error);
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    await req.genre.destroy();

    res.status(204).json({ status: 'success', data: { genre: null } });
  } catch (error) {
    next(error);
  }
};
