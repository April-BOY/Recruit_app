const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
// 创建socket服务器
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(bodyParser());
app.use(cookieParser());
// app.use('/user',Router);
//! 因为user.js导出了Router，所以，require('./user') <==> Router
app.use('/user',require('./user'));

const Chat = require('./model').getModel('chat');

// 监听前台广播的sendmsg事件，并接收前台发送过来的消息,然后存入数据库
io.on('connection',(socket)=>{
    socket.on('sendmsg',({from,to,msg})=>{
        console.log({from,to,msg});
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg,'create_time':new Date().getTime()},(err,doc)=>{
            if(!err){
                // ! 向前台广播一个recvmsg事件，并把聊天信息传送过去
                io.emit('recvmsg',doc);
            }
        });
    })
});


// 创建完sockete服务器，需要将app.listen(8888);改为server.listen(8888);
// 这是socket.io文档要求的这样写的
server.listen(8888);