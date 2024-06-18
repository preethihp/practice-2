const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { verifyToken } = require('../middleware/auth');

router.post('/create', verifyToken, groupController.createGroup);
router.post('/:groupId/members', verifyToken, groupController.addUserToGroup);
router.get('/getUserGroups/:userId', verifyToken, groupController.getUserGroups);
router.get('/:groupId/messages', verifyToken, groupController.getGroupMessages);

module.exports = router;
