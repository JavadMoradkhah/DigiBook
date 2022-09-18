const router = require('express').Router();
const {
  findOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orders');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/user-orders', auth, getUserOrders);

router.get('/', auth, admin, getAllOrders);

router.get('/:id', auth, admin, findOrder, getOrderById);

router.post('/', auth, createOrder);

router.patch('/:id', auth, admin, findOrder, updateOrder);

module.exports = router;
