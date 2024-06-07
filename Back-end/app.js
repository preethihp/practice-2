const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/signupRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', router);

app.listen(3000);