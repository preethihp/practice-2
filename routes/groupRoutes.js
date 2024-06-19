const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const groupMessageController = require('../controllers/groupMessageController');
const {verifyToken} = require('../middleware/auth');

// Group routes
router.post('/create',verifyToken, groupController.createGroup);
router.post('/addUser',verifyToken, groupController.addUserToGroup);
router.get('/:groupId/users',verifyToken, groupController.getUsersInGroup);
router.get('/:userId/groups',verifyToken, groupController.getUserGroups);

// Group message routes
router.post('/sendMessage',verifyToken, groupMessageController.sendMessageToGroup);
router.get('/:groupId/messages',verifyToken, groupMessageController.getGroupMessages);

router.get('/',verifyToken,  groupController.getUserByUsername);


module.exports = router;
