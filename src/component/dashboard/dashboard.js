// 牛人列表、公司列表、消息列表、个人中心、底部标签导航栏的容器组件
import React from 'react';
import {NavBar} from 'antd-mobile';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import User from '../user/user';
import NavBarLink from '../navbarlink/navbarlink';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import {getMsgList,recvMsg} from '../../redux/chat.redux';

@connect(
    // ! 因为这里将全部的state都扩展过来了，所以，在下面使用的时候就需要指明使用哪一个reducer
    // ! 即this.props.user.type=="genius"
    state=>state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component{
     // 一进来就获取用户的聊天记录
     componentDidMount(){
        // ? 为什么这里不用指明是chat表中的getMsgList()，即写成this.props.chat.getMsgList();
        // ￥ 因为导入这个方法的时候已经表明是从chat表中导入进来的，所以，这里不用在指明
        this.props.getMsgList();
        // 接收socket服务器发送过来的消息
        this.props.recvMsg();
    }
    render(){
        const navList = [
            {
                path:'/boss',
                component:Boss,
                title:'牛人列表',
                text:'牛人',
                icon:'boss',
                hide:this.props.user.type==="genius"
            },
            {
                path:'/genius',
                component:Genius,
                title:'BOSS列表',
                text:'boss',
                icon:'job',
                hide:this.props.user.type==="boss"
            },
            {
                path:'/msg',
                component:Msg,
                title:'消息列表',
                text:'消息',
                icon:'msg'
            },
            {
                path:'/user',
                component:User,
                title:'个人中心',
                text:'我',
                icon:'user'
            }
        ];
        //! 通过路由实现NavBar内容的切换
        const {pathname} = this.props.location;
        const head = navList.find(v=>v.path===pathname);
        // console.log(head);
        if(!head){
            return null;
        }
        return (
            <div>
                <NavBar mode="dark">{head.title}</NavBar>
                <div>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route  path={v.path} 
                                        component={v.component}
                                //因为每一个path都不同，所以，用它来做key
                                        key={v.path}
                                ></Route>
                            ))
                        }
                    </Switch>
                </div>
                {/* 父子组件传值 */}
                <NavBarLink data={navList}></NavBarLink>
            </div>
        )
    }
}

export default DashBoard;