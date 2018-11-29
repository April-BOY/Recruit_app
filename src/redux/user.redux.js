import axios from 'axios';
import {getRedirectPath} from '../util.js';
import {push} from 'react-router-redux';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    user:'',
    //! 因为会在redux开发者工具中看到用户的密码，所以，要在这里屏蔽
    // pwd:'',
    type:'',
    redirectTo:''
};

export default function user(state=initState,action){
    switch (action.type) {
        case AUTH_SUCCESS:
        /**
        * * action是一个对象
        * ! ...action.payload?
        * ￥ return {...state,...action.payload,msg:''} 表示
        * ￥ reutrn { ...state <==> user:'新值',type:'新值',redirectTo:'新值'
        * ￥ ...action.payload:这个写法表示只扩展action对象的payload属性过来,扩展后得到的是一个对象
        * ￥ 最终就是：{user:'新值',type:'新值',redirectTo:'新值',{},msg:''}
        * * 因为是成功登录的动作，所以，错误信息为空
        * *
        */
            return {...state,...action.payload,msg:'',redirectTo:getRedirectPath(action.payload)};
        case ERROR_MSG:
        // 如果是执行返回错误信息的动作，则返回动作生成器中的得到的错误信息
            return {...state,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload,msg:''}
        default:
            return state;
    }
}
/**
* ! 因为返回错误信息的动作是redux自己使用，所以，不用在动作生成器中导出到
* ! 组件中给用户使用，而且，用户也不能触发错误信息的动作，因为页面上没有交互的地方
* *
*/
function errorMsg(msg){
    return {type:ERROR_MSG,msg}
}
// payload表示请求的数据
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
/**
* ! 动作生成器最后 return 的肯定是动作，所以，如果return的不是原本定义好的动作，
* ! 就要重新定义这个动作
* * 比如，下面的进行登录操作的动作生成器，原本应该的return的是：return LOGIN这个
* * 动作，但是，考虑到如果用户或者密码没有输入，要return相关的信息，这时候，return
* * 相关的信息，这又是一个动作，所以，要定义 ERROR_MSG 这个动作.
*/
// action creator
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名和密码必须输入");
    }
    return dispatch =>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status==200&&res.data.code==0){
                    dispatch(authSuccess(res.data.data));
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg("用户名和密码必须输入");
    }
    if(pwd!==repeatpwd){
        return errorMsg("密码不一致");
    }
   return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        });
   }
}

function loadData(data){
    return {type:LOAD_DATA,payload:data};
}
// 对login或者register以外的路由，进行权限控制
export function authControl(){
    return dispatch=>{
        // 通过/info接口，判断当前用户的cookie是否在数据库中存在
        axios.get('/user/info')
            .then(res=>{
                if(res.data.code==0){
                    // 有登录信息，该去哪里去哪里
                    dispatch(loadData(res.data.data));
                }else{
                    // 没有登录信息，路由跳转到登录页面
                    // this.props.history.push('/login');
                    dispatch(push('/login'));
                }
            });
    }
}

/**
* ! (1)接收用户在信息完善页的信息填入的信息
* ! (2)更新当前redux的state
* !     (结合后台来看，就是用后台返回的数据更新当前redux的state.不结合后台，则是直接用用户输入的信息更新当前redux的state)
* ! (3)将信息存入数据库中

* ! 这个思路可以用来理解其他的动作生成器的操作
* *
*/
export function update(data){
    return dispatch=>{
        axios.post('user/update',data)
        .then(res=>{
           if(res.status==200&&res.data.code==0){
               dispatch(authSuccess(res.data.data));
           }else{
               dispatch(errorMsg(res.data.msg));
           }
        });
    }
}