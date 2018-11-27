const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


app.use(bodyParser());
// app.use(cookieParser);
// app.use('/user',Router);
//! 因为user.js导出了Router，所以，require('./user') <==> Router
app.use('/user',require('./user'));

app.listen(8888);