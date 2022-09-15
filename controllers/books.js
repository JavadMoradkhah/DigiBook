// const { ValidationError } = require('sequelize');
const Book = require('../models/Book');
const { BookSchema, BookUpdateSchema } = require('../schemas/Book');

exports.findBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ status: 'fail', message: 'The book not found with the given id!' });
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
    const validation = BookSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

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
