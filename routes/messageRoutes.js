const express = require('express');
const { getUsers, getMessages, sendMessage } = require('../controllers/messageController');
const {verifyToken} = require('../middleware/auth');
const router = express.Router();

router.get('/users',verifyToken, getUsers);
router.get('/messages',verifyToken, getMessages);
router.post('/messages',verifyToken, sendMessage);

module.exports = router;
