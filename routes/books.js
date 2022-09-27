// const multer = require('multer')().none();
const router = require('express').Router();
const validateBook = require('../middleware/validators/book');
const {
  uploadBookThumbnail,
  findBook,
  getAllBooks,
  getBestSellingBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getAllBooks);

router.get('/best-selling', getBestSellingBooks);

router.get('/:id', findBook, getBookById);

router.post('/', auth, admin, uploadBookThumbnail, validateBook, createBook);

router.patch('/:id', auth, admin, findBook, updateBook);

router.delete('/:id', auth, admin, findBook, deleteBook);

module.exports = router;
