const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const Router = express.Router();

app.use(bodyParser());
app.use(cookieParser());
app.use('/user',require('./user'));


app.listen(8888)