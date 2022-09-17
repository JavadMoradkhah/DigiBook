const { DataTypes } = require('sequelize');
const database = require('../startup/database');

const Genre = database.define(
  'Genre',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ['name'] }], underscored: true }
);

module.exports = Genre;
