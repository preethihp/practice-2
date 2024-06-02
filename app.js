const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');

const loginRoutes = require('./routes/login');
const messageRoutes = require('./routes/message');
const contactusRouter = require('./routes/contactus');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/login',loginRoutes);
app.use('/',messageRoutes);
app.use('/',contactusRouter);

app.use(errorController.error404);

app.listen(3000);