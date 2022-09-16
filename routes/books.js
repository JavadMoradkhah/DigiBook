// const multer = require('multer')().none();
const router = require('express').Router();
const validateBook = require('../middleware/validators/book');
const {
  uploadBookThumbnail,
  findBook,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books');

router.param('id', findBook);

router.route('/').get(getAllBooks).post(uploadBookThumbnail, validateBook, createBook);

router.route('/:id').get(getBookById).patch(updateBook).delete(deleteBook);

module.exports = router;
