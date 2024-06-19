const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/chat', messageRoutes);


sequelize.sync()
  .then(result => {
    console.log('Database synced successfully');
    // Start server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log('Error syncing database:', err);
  });