const Message = require('../models/messageModel');
const { Op } = require('sequelize');


exports.sendMessage = async (req, res, next) => {
  const { receiverId, text } = req.body;
  const senderId = req.userId;

  try {
    await Message.create({
      senderId,
      receiverId,
      text
    });
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  const userId = req.params.userId;
  const loggedInUserId = req.userId;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: loggedInUserId, receiverId: userId },
          { senderId: userId, receiverId: loggedInUserId }
        ]
      },
      order: [['createdAt', 'ASC']] // Order by createdAt in ascending order
    });
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};
