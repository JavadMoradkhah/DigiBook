const AppError = require('../utils/AppError');
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
      return next(new AppError(404, 'fail', 'The book not found with the given id.'));
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
      return next(new AppError(400, 'fail', 'Please upload the book thumbnail image.'));
    }

    req.body.thumbnail_image = `uploads/${req.file.filename}`;

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
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let { book } = req;

    if (req.body.genre_id) {
      const genre = await Genre.findByPk(req.body.genre_id);
      if (!genre) {
        return next(new AppError(400, 'fail', 'Invalid genre Id.'));
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
