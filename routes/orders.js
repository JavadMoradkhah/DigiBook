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

router.get('/user-orders', auth, getUserOrders);

router.param('id', findOrder).all(auth);

router.route('/').all(auth).get(getAllOrders).post(createOrder);

router.route('/:id').get(getOrderById).patch(updateOrder);

module.exports = router;
