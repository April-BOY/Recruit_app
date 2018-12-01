// 聊天列表的reducer，即聊天记录的表，获取的是两个用户的聊天记录
import axios from 'axios';
import io from 'socket.io-client';
// 链接socket服务器
const socket = io('http://localhost:8888');

// 获取消息列表
const MSG_LIST = "MSG_LIST";
// 接收socket服务器发送过来的消息
const MSG_RECV= "MSG_RECV";

const initState = {
    chatmsgs:[],
    unread:0,
    users:{}
};

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsgs:action.payload,users:action.users};
        case MSG_RECV:
            return {...state,chatmsgs:[...state.chatmsgs,action.payload]}
        default:
            return state;
    }
}

function msgList(msgs,users){
    return {type:MSG_LIST,payload:msgs,users}
}
// 获取聊天记录
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getMsgList')
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(msgList(res.data.msgs,res.data.users));
                }
            });
    }
}

// 发送聊天记录给后台，让后台存入数据库
export function sendMsg({from,to,msg}){
    return (dispatch,getState)=>{
        // ! 向后台报一个sendMsg事件，并将聊天的内容和聊天的人的id发过去
        socket.emit('sendmsg',{from,to,msg})
    }
}

function msgRecv(msg){
    return {type:MSG_RECV,payload:msg}
}
// 接收socket服务器发送过来的消息
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',(msg)=>{
            dispatch(msgRecv(msg));
        })
    }
}