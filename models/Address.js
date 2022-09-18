const { DataTypes } = require('sequelize');
const database = require('../startup/database');
const User = require('./User');

const Address = database.define(
  'Address',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    additional_info: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  { underscored: true }
);

Address.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = Address;
