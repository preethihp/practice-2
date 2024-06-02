const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const loginRoutes = require('./routes/login');
const messageRoutes = require('./routes/message');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/login',loginRoutes);
app.use('/',messageRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);