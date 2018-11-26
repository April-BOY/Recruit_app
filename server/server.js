const express = require('express');
const app = express();
const Router = express.Router();

Router.get('/info',(req,res)=>{
    res.json({code:0});
});

app.use('/user',Router);

app.listen(8888);