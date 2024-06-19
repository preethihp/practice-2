const express = require('express');
const { getUsers, getMessages, sendMessage } = require('../controllers/messageController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);

module.exports = router;
