const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/dataRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({extended:false}));

app.use('/',router);

app.listen(4000);