require('dotenv').config();
const database = require('../startup/database');

database.sync({ alter: true });
