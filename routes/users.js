const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUser, updateUser } = require('../controllers/users');
const checkBody = require('../middleware/check-body');

router.get('/me', auth, getUser);

router.patch('/updateMe', auth, checkBody, updateUser);

module.exports = router;
