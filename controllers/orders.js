const { Op } = require('sequelize');
const AppError = require('../utils/AppError');
const Order = require('../models/Order');
const Book = require('../models/Book');
const User = require('../models/User');
const { OrderSchema, OrderUpdateSchema } = require('../schemas/Order');

// Accessibility: Admins & Authenticated Users
exports.findOrder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const order = await Order.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Book, as: 'book', attributes: ['id', 'title', 'thumbnail_image', 'price'] },
      ],
      attributes: {
        exclude: ['user_id', 'book_id'],
      },
    });

    if (!order) {
      return next(new AppError(404, 'fail', 'The order not found with the given id!'));
    }

    req.order = order;

    next();
  } catch (error) {
    next(error);
  }
};

// Accessibility: Admins Only
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();

    res.status(200).json({ status: 'success', data: { orders } });
  } catch (error) {
    next(error);
  }
};

// // Accessibility: Admins & Authenticated Users
exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Book, as: 'book', attributes: ['id', 'title', 'thumbnail_image', 'price'] },
      ],
      attributes: {
        exclude: ['user_id', 'book_id'],
      },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({ status: 'success', data: { orders } });
  } catch (error) {
    next(error);
  }
};

// // Accessibility: Admins & Authenticated Users
exports.getOrderById = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { order: req.order } });
  } catch (error) {
    next(error);
  }
};

// // Accessibility: Authenticated Users
exports.createOrder = async (req, res, next) => {
  try {
    // 1- Validating request body
    const validation = OrderSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    req.body.user_id = req.user.id;

    // 2- Checking whether the book id is valid or not
    const book = await Book.findByPk(req.body.book_id);
    if (!book) {
      return next(new AppError(400, 'fail', 'The given book id is invalid.'));
    }

    // 3- Checking whether the user has ordered the book or not
    let order = await Order.findOne({
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { book_id: req.body.book_id },
          { status: { [Op.ne]: 'DELIVERED' } },
        ],
      },
    });

    if (order) {
      return next(new AppError(400, 'fail', 'You have already placed this order.'));
    }

    // 4- Checking whether order quantity is less than or equal to book quantity
    if (req.body.quantity > book.quantity) {
      return next(
        new AppError(
          400,
          'fail',
          'The order quantity must be less than or equal to the amount of the book in stock.'
        )
      );
    }

    // 5- Setting order price according to book price
    req.body.price = book.price;

    // 6- Adding order to the database
    order = await Order.create(req.body);

    // 7- Updating the book quantity in stock
    book.quantity -= req.body.quantity;
    await book.save();

    res.status(200).json({ status: 'success', data: { order } });
  } catch (error) {
    next(error);
  }
};

// Accessibility: Admins Only
exports.updateOrder = async (req, res, next) => {
  try {
    const validation = OrderUpdateSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let { order } = req;

    order.status = req.body.status;

    order = await order.save();

    res.status(200).json({ status: 'success', data: { order } });
  } catch (error) {
    next(error);
  }
};
