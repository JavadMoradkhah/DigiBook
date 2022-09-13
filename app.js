const express = require('express');
const homeRoute = require('./routes/home');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/', homeRoute);

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}/api/`);
});
