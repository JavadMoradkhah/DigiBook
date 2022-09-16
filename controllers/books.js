// const { ValidationError } = require('sequelize');
const Book = require('../models/Book');
const Genre = require('../models/Genre');
const { BookUpdateSchema } = require('../schemas/Book');
const upload = require('../config/storage');

exports.uploadBookThumbnail = upload.single('thumbnail_image');

exports.findBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const book = await Book.findByPk(id);

    if (!book) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'The book not found with the given id!' });
    }

    req.book = book;

    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({ order: [['title']] });

    res.status(200).json({ status: 'success', data: { books } });
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { book: req.book } });
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please upload the book thumbnail image.' });
    }

    req.body.thumbnail_image = `uploads/${req.file.filename}`;

    console.log('thumbnail_image:', req.body.thumbnail_image);

    const book = await Book.create(req.body);

    res.status(200).json({ status: 'success', data: { book } });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const validation = BookUpdateSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    let { book } = req;

    if (req.body.genre_id) {
      const genre = await Genre.findByPk(req.body.genre_id);
      if (!genre) {
        return res.status(400).json({ status: 'fail', message: 'Invalid genre Id.' });
      }
    }

    Object.assign(book, req.body);

    book = await book.save();

    res.status(200).json({ status: 'success', data: { book } });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await req.book.destroy();

    res.status(204).json({ status: 'success', data: { book: null } });
  } catch (error) {
    next(error);
  }
};
