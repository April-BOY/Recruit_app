import React from "react";
import {withRouter} from "react-router-dom"
import axios from "axios"
import {loadData} from "../../redux/user.redux";
import {connect} from "react-redux"


@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        //url地址是login或者register不需要跳转
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        //如果是login或者register以外的路由，要权限控制
        axios.get('/user/info')
            .then(res=>{
                if(res.data.code==0){
                    //有登录信息，该去哪里去哪里
                    this.props.loadData(res.data.data);
                    //根据用户的type，身份是boss还是牛人，根据用户信息是否完善
                }else{
                    //没有登录信息，路由跳转到登录页面
                    this.props.history.push('/login')
                }
            })


    }
    render(){
        return null;
    }
}

export default AuthRoute