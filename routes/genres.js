const router = require('express').Router();
const {
  findGenre,
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genres');

router.param('id', findGenre);

router.route('/').get(getAllGenres).post(createGenre);

router.route('/:id').get(getGenreById).patch(updateGenre).delete(deleteGenre);

module.exports = router;
