// 权限控制路由
import React from 'react';
import {withRouter} from 'react-router-dom';
import {authControl} from '../../redux/user.redux';
import { connect } from 'react-redux';

@withRouter
@connect(
    null,
    {authControl}
)
class Authroute extends React.Component{
    // 因为是对路由进行操作，所以，必须是组件挂载到页面上才可以进行操作，因此，在componentDidMount()中处理
    componentDidMount(){
        // url地址是login或者register则不需要跳转，所以，单独做成一个数组
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        // ! 大于-1，表示路由中包含了login和register路由
        if(publicList.indexOf(pathname)>-1){
            // 因为不需要跳转，所以，return null
            return null;
        }
        // 如果是login或者register以外的路由，要进行权限控制
        this.props.authControl();
    }
    render(){
        return null;
    }
       
}

export default Authroute;