const { Op } = require('sequelize');
const Chat = require('../models/chat');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file');

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
                    as: 'sender',
                    attributes: ['id', 'name'],
                },
            ],
            order: [['createdAt', 'ASC']],
            limit: 10,
        });

        const formattedMessages = messages.map(msg => ({
            id: msg.id,
            senderId: msg.senderId,
            senderName: msg.sender.name,
            receiverId: msg.receiverId,
            message: msg.message,
            filePath: msg.filePath,
            createdAt: msg.createdAt,
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.sendMessage = async (req, res) => {
  upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading
          console.error('Multer error:', err);
          return res.status(500).json({ error: 'Error uploading file' });
      } else if (err) {
          // An unknown error occurred
          console.error('Unknown error:', err);
          return res.status(500).json({ error: 'Unknown error' });
      }

      console.log('req.file:', req.file);

      const { senderId, receiverId, message } = req.body;
      const filePath = req.file ? `/uploads/${req.file.filename}` : null;

      if (!senderId || !receiverId || (!message && !filePath)) {
          return res.status(400).json({ error: 'senderId, receiverId, and either message or file are required' });
      }

      try {
          const chatMessage = await Chat.create({
              senderId,
              receiverId,
              message,
              filePath
          });

          res.status(201).json(chatMessage);
      } catch (error) {
          console.error('Error sending message:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
};

