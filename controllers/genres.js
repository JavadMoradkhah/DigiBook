const { ValidationError } = require('sequelize');
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
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.findAll({ order: [['genreName']] });

    res.status(200).json({ status: 'success', data: { genres } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.getGenreById = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { genre: req.genre } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.createGenre = async (req, res, next) => {
  try {
    const validation = GenreSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    const genre = await Genre.create({ genreName: req.body.genreName });

    res.status(200).json({ status: 'success', data: { genre } });
  } catch (error) {
    if (error instanceof ValidationError && error.parent.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ status: 'fail', message: 'A genre with the given name already exists.' });
    }
    res.status(400).json({ status: 'fail', message: error });
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
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    await req.genre.destroy();

    res.status(204).json({ status: 'success', data: { genre: null } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
