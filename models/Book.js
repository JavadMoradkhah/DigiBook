const { DataTypes } = require('sequelize');
const database = require('../startup/database');
const Genre = require('./Genre');
const Review = require('./Review');

const Book = database.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    thumbnail_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: true,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    copyright_holder: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    copyright_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { indexes: [{ unique: true, fields: ['title'] }, { fields: ['publisher'] }], underscored: true }
);

Book.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });

Book.hasMany(Review, { as: 'reviews', foreignKey: 'book_id' });

module.exports = Book;
