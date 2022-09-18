const router = require('express').Router();
const {
  findGenre,
  getAllGenres,
  getGenreById,
  getGenreStats,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genres');

router.get('/genre-stats', getGenreStats);

router.param('id', findGenre);

router.route('/').get(getAllGenres).post(createGenre);

router.route('/:id').get(getGenreById).patch(updateGenre).delete(deleteGenre);

module.exports = router;
