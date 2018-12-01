// 聊天列表的reducer，即聊天记录的表，获取的是两个用户的聊天记录
import axios from 'axios';
import io from 'socket.io-client';
// 链接socket服务器
const socket = io('http://localhost:8888');

// 获取消息列表
const MSG_LIST = "MSG_LIST";
// 接收socket服务器发送过来的消息
const MSG_RECV= "MSG_RECV";
// 未读的消息变为已读的消息
const MSG_READ="MSG_READ";
// ! 解决在聊天页面，输入完信息后，点击发送，在页面显示多条消息的bug
let IS_MSG_RECV=0;

const initState = {
    chatmsgs:[],
    unread:0,
    // 以用户的id为键，用户名和头像为值，生成一份新的表
    users:{}
};

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,
                chatmsgs:action.payload,
                users:action.users,
                unread:action.payload.filter(v=>!v.read&&v.to===action.userid).length
            };
        case MSG_RECV:
            const n = action.payload.to = action.userid?1:0;
            return {...state,
                chatmsgs:[...state.chatmsgs,action.payload],
                unread:state.unread+n
            }
        case MSG_READ:
            return {...state,
                chatmsgs:state.chatmsgs.map(v=>{
                    if(v.from===action.from&&v.to===action.userid){
                        v.read = true;
                    }
                    return v;
                }),
                unread:state.unread-action.payload}
        default:
            return state;
    }
}

function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:msgs,users,userid}
}
// 获取聊天记录
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getMsgList')
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    // ! 这里的getState函数可以拿到所有的表(reducer)的state，不限于单张表的内容
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs,res.data.users,userid));
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

function msgRecv(msg,userid){
    return {type:MSG_RECV,payload:msg,userid}
}
// 接收socket服务器发送过来的消息
export function recvMsg(){
    return (dispatch,getState)=>{
        if(IS_MSG_RECV){
            return;
        }
        socket.on('recvmsg',(msg)=>{
            const userid = getState().user._id;
            IS_MSG_RECV=1;
            dispatch(msgRecv(msg,userid));
        })
    }
}


function msgRead(userid,from,num){
    return {type:MSG_READ,payload:num,userid,from}
}
// 将未读消息变为已读
export function readMsg(from){
    return (dispatch,getState)=>{
        // ! 因为后台是通过req.body获取一个对象的，所以，这里的from要作为一个对象传过去
        axios.post('/user/readMsg',{from})
            .then(res=>{
                const userid = getState().user._id;
                if(res.status===200&&res.data.code===0){
                    dispatch(msgRead(userid,from,res.data.num))
                }
            });
        
    }
}