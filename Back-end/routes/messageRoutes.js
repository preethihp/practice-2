const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const isAuth = require('../middleware/auth');

router.post('/', isAuth, messageController.sendMessage);
router.get('/:userId', isAuth, messageController.getMessages);

module.exports = router;
