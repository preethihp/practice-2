const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const userRouter = require('./routes/signupRoutes');
const expenseRouter = require('./routes/expenseRouter');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/', userRouter);
app.use('/expenses', expenseRouter);

app.listen(3000);