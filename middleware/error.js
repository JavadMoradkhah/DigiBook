const path = require('path');
const { unlink } = require('fs').promises;
const AppError = require('../utils/AppError');

module.exports = async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  // Checking if a file has been uploaded
  if (req.file) {
    const uploadedFilePath = path.resolve(process.cwd(), `./public/uploads/${req.file.filename}`);
    // Deleting uploaded file because of occurring error
    await unlink(uploadedFilePath);
  }

  const defaultErrorMessage = 'Something went wrong: Please try again later.';

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message || defaultErrorMessage });
  }

  res.status(500).json({ status: 'error', message: defaultErrorMessage });
};
