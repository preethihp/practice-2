const { Op } = require('sequelize');
const Chat = require('../models/chat');
const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  const { userId, receiverId } = req.query;
  if (!userId || !receiverId) {
    return res.status(400).json({ error: 'userId and receiverId are required' });
  }

  try {
    const messages = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender', // This is the alias for the association
          attributes: ['id', 'name'], // Include only id and name of the sender
        },
      ],
      order: [['createdAt', 'ASC']],
      limit: 10,
    });

    // Format the messages to include senderName along with other message data
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      senderId: msg.senderId,
      senderName: msg.sender.name, // Get the sender's name from the included user model
      receiverId: msg.receiverId,
      message: msg.message,
      createdAt: msg.createdAt,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: 'senderId, receiverId, and message are required' });
  }

  try {
    const chatMessage = await Chat.create({ senderId, receiverId, message });
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};