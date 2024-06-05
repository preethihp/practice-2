const express = require('express');
const bosyParser = require('body-parser');
var cors = require('cors');

const userRoutes = require('./routes/userRouter');


const app = express();
app.use(cors());

app.use(bosyParser.json());
app.use(bosyParser.json({extended:false}));

app.use('/',userRoutes);


app.listen(4000);
