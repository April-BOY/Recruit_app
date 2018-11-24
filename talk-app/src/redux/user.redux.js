import axios from "axios"
import {getRedirectPath} from "../util";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const initState = {
    user:'',
    // pwd:'',
    type:'',
    msg:'',
    redirectTo:''
};

//reducer
export function user(state=initState,action){
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,...action.payload,msg:'',redirectTo:getRedirectPath(action.payload)}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload,msg:''}
        default:
            return state;
    }
}
function errorMsg(msg){
    return {type:ERROR_MSG,msg}
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}

//action create
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名和密码必须输入")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status==200&&res.data.code==0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg("用户名和密码必须输入")
    }
    if(pwd!==repeatpwd){
        return errorMsg("密码和确认密码不同")
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status==200&&res.data.code==0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function loadData(data){
    return {type:LOAD_DATA,payload:data}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status==200&&res.data.code==0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}