const { DataTypes } = require('sequelize');
const database = require('../startup/database');
const Book = require('./Book');
const User = require('./User');

const Order = database.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['PENDING', 'CONFIRMED', 'REJECTED', 'SENT', 'DELIVERED'],
      defaultValue: 'PENDING',
    },
    price: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.price * this.quantity;
      },
    },
  },
  { underscored: true }
);

Order.belongsTo(Book, { as: 'book', foreignKey: 'book_id' });

Order.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = Order;
