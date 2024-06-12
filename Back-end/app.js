const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const userRouter = require('./routes/signupRoutes');
const expenseRouter = require('./routes/expenseRouter');
const sequelize = require('./util/database');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', userRouter);
app.use('/expenses', expenseRouter);

sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

