const router = require('express').Router();
const { findReview, createReview, updateReview, deleteReview } = require('../controllers/reviews');
const auth = require('../middleware/auth');

router.param('id', findReview);

router.route('/').post(auth, createReview);

router.route('/:id').patch(auth, updateReview).delete(auth, deleteReview);

module.exports = router;
