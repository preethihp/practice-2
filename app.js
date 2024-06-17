const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();


app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/auth', authRoutes);
app.use('/chat', messageRoutes);


sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`Server running on port 3000`);
    });
}).catch(err => console.log(err));
