// const { ValidationError } = require('sequelize');
const Genre = require('../models/Genre');
const { GenreSchema } = require('../schemas/Genre');

exports.findGenre = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({ status: 'fail', message: 'The genre not found with the given id!' });
    }

    req.genre = genre;

    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ order: [['genre_name']] });

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

exports.createGenre = async (req, res, next) => {
  try {
    const validation = GenreSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: 'fail', message: validation.error.message });
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
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    let { genre } = req;

    genre.genreName = req.body.genreName;

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
