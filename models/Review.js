const { DataTypes } = require('sequelize');
const database = require('../startup/database');
const User = require('./User');

const Review = database.define(
  'Review',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  { underscored: true }
);

Review.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = Review;
