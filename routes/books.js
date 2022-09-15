const router = require('express').Router();
const { findBook, getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/books');

router.param('id', findBook);

router.route('/').get(getAllBooks).post(createBook);

router.route('/:id').get(getBookById).patch(updateBook).delete(deleteBook);

module.exports = router;
