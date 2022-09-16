require('dotenv').config();
const express = require('express');
const homeRoute = require('./routes/home');
const authRoutes = require('./routes/auth');
const genreRoutes = require('./routes/genres');
const bookRoutes = require('./routes/books');
const errorMiddleware = require('./middleware/error');
const database = require('./startup/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/', homeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/books', bookRoutes);

app.use(errorMiddleware);

database.sync();

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}/api/`);
});

process.on('exit', () => {
  database.close();
});
