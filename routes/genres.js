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
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/genre-stats', getGenreStats);

router.get('/', getAllGenres);

router.get('/:id', findGenre, getGenreById);

router.post('/', auth, admin, createGenre);

router.patch('/:id', auth, admin, findGenre, updateGenre);

router.delete('/:id', auth, admin, findGenre, deleteGenre);

module.exports = router;
