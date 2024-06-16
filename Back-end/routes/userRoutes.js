const express = require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', isAuth, userController.getUsers);
router.get('/:userId', isAuth, userController.getUserById);

module.exports = router;
