const GroupMessage = require('../models/groupMessage');
const User = require('../models/user');

// Send a message to a group
exports.sendMessageToGroup = async (req, res) => {
  const { groupId, senderId, message } = req.body;
  if (!groupId || !senderId || !message) {
    return res.status(400).json({ error: 'groupId, senderId, and message are required' });
  }

  try {
    const groupMessage = await GroupMessage.create({ groupId, senderId, message });
    res.status(201).json(groupMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Get messages from a group
exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await GroupMessage.findAll({
      where: { groupId },
      include: [
        {
          model: User,
          
          attributes: ['id', 'name'],
          as:'sender',
        },
      ],
      order: [['createdAt', 'ASC']],
      limit: 10,
    });

    // Format the messages to include senderName along with other message data
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      senderId: msg.senderId,
      senderName: msg.sender ? msg.sender.name : 'Unknown User',
      groupId: msg.groupId,
      message: msg.message,
      createdAt: msg.createdAt,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};
