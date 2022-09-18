const router = require('express').Router();
const { findReview, createReview, updateReview, deleteReview } = require('../controllers/reviews');
const auth = require('../middleware/auth');

router.post('/', auth, createReview);

router.patch('/:id', auth, findReview, updateReview);

router.delete('/:id', auth, findReview, deleteReview);

module.exports = router;
