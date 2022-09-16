const { Sequelize } = require('sequelize');
const { writeFile } = require('fs').promises;

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: async (msg) => {
    await writeFile('db.log', `${msg}\n`, { flag: 'a' });
  },
});

module.exports = database;
