require('dotenv').config();
const path = require('path');
const express = require('express');
const homeRoute = require('./routes/home');
const authRoutes = require('./routes/auth');
const genreRoutes = require('./routes/genres');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const orderRoutes = require('./routes/orders');
const addressRoutes = require('./routes/addresses');
const errorMiddleware = require('./middleware/error');
const database = require('./startup/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.static(path.resolve(process.cwd(), './public')));

app.use('/api/', homeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}/api/`);
});

process.on('exit', () => {
  database.close();
});
