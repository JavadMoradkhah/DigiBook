const router = require('express').Router();
const {
  findAddress,
  getAddressById,
  getUserAddresses,
  createAddress,
  updateAddress,
} = require('../controllers/address');
const auth = require('../middleware/auth');

router.get('/user-addresses', auth, getUserAddresses);

router.get('/:id', auth, findAddress, getAddressById);

router.post('/', auth, createAddress);

router.patch('/:id', auth, findAddress, updateAddress);

module.exports = router;
