const AppError = require('../utils/AppError');
const database = require('../startup/database');
const Book = require('../models/Book');
const Genre = require('../models/Genre');
const Review = require('../models/Review');
const { BookUpdateSchema } = require('../schemas/Book');
const upload = require('../config/storage');

exports.uploadBookThumbnail = upload.single('thumbnail_image');

exports.findBook = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const ratingSubQuery = `(
      SELECT AVG(reviews.rating) FROM reviews WHERE reviews.book_id = Book.id
    )`;

    const book = await Book.findByPk(id, {
      include: [
        { model: Genre, as: 'genre' },
        { model: Review, as: 'reviews' },
      ],
      attributes: {
        exclude: 'genre_id',
        include: ['id', [database.literal(ratingSubQuery), 'rating']],
      },
    });

    if (!book) {
      return next(new AppError(404, 'fail', 'The book not found with the given id.'));
    }

    req.book = book.toJSON();

    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const ratingSubQuery = `(
      SELECT AVG(reviews.rating) FROM reviews WHERE reviews.book_id = Book.id
    )`;

    const books = await Book.findAll({
      order: [['title']],
      include: [{ model: Genre, as: 'genre' }],
      attributes: {
        exclude: 'genre_id',
        include: ['id', [database.literal(ratingSubQuery), 'rating']],
      },
    });

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

    let book = await Book.findOne({ where: { title: req.body.title } });
    if (book) {
      return next(new AppError(400, 'fail', 'The book with the given title already exists.'));
    }

    let { discount_price, price } = req.body;

    // Converting string to number
    discount_price *= 1;
    price *= 1;

    if (discount_price && discount_price >= price) {
      return next(
        new AppError(400, 'fail', 'The book discount price must be less than its original price')
      );
    }

    book = await Book.create(req.body);

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

    const { discount_price } = req.body;

    if (discount_price && discount_price >= book.price) {
      return next(
        new AppError(400, 'fail', 'The book discount price must be less than its original price')
      );
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
    await Book.destroy({ where: { id: req.book.id } });

    res.status(204).json({ status: 'success', data: { book: null } });
  } catch (error) {
    next(error);
  }
};
