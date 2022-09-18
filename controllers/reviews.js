const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const Book = require('../models/Book');
const Review = require('../models/Review');
const { ReviewSchema } = require('../schemas/Review');

exports.findReview = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const review = await Review.findByPk(id);

    if (!review) {
      return next(new AppError(404, 'fail', 'The review not found with the given id!'));
    }

    req.review = review;

    next();
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const validation = ReviewSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    req.body.user_id = req.user.id;

    const book = await Book.findByPk(req.body.book_id);
    if (!book) {
      return next(new AppError(400, 'fail', 'The given book id is invalid.'));
    }

    let review = await Review.findOne({
      where: { [Op.and]: [{ user_id: req.user.id }, { book_id: req.body.book_id }] },
    });

    if (review) {
      return next(new AppError(400, 'fail', 'You already registered your review for this book.'));
    }

    review = await Review.create(req.body);

    res.status(200).json({ status: 'success', data: { review } });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const validation = ReviewSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let { review } = req;

    review.comment = req.body.comment;

    review = await review.save();

    res.status(200).json({ status: 'success', data: { review } });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await req.review.destroy();

    res.status(204).json({ status: 'success', data: { review: null } });
  } catch (error) {
    next(error);
  }
};
