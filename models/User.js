const { DataTypes } = require('sequelize');
const database = require('../startup/database');

const User = database.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ['email'] }] }
);

module.exports = User;
