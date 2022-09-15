const { DataTypes } = require('sequelize');
const database = require('../startup/database');

const Genre = database.define(
  'Genre',
  {
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    genreName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ['genreName'] }] }
);

module.exports = Genre;
