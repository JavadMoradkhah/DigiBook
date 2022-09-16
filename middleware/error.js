const { ValidationError } = require('sequelize');

module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ status: 'fail', message: err.parent.sqlMessage });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Something went wrong: Please try again later.' });
};
