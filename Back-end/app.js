// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/messageModel');
const User = require('./models/userModel');

const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('sendMessage', (message) => {
    // Save message to the database
    Message.create(message).then((savedMessage) => {
      Message.findByPk(savedMessage.id, {
        include: [{ model: User, as: 'sender' }]
      }).then((fullMessage) => {
        io.emit('receiveMessage', fullMessage);
      });
    }).catch(err => {
      console.error('Error saving message:', err);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

sequelize.sync()
  .then(result => {
    server.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
