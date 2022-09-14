require('dotenv').config();
const express = require('express');
const homeRoute = require('./routes/home');
const database = require('./startup/database');

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/', homeRoute);

database.sync();

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}/api/`);
});

process.on('exit', () => {
  database.close();
});
