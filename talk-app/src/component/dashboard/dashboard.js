import React from "react";
import {NavBar} from "antd-mobile";
import Boss from "../boss/boss";
import Msg from "../msg/msg"
import User from "../user/user"
import Genius from "../genius/genius"
import NavBarLink from "../navbarlink/navbarlink"
import {connect} from "react-redux"
import {Switch,Route} from "react-router-dom"

@connect(
    state=>state
)
class DashBoard extends React.Component{
    render(){

        const navList = [
            {
                path:'/boss',
                component:Boss,
                title:'牛人列表',
                text:'牛人',
                icon:'boss',
                hide:this.props.user.type=="genius"
            },
            {
                path:'/genius',
                component:Genius,
                title:'BOSS列表',
                text:'boss',
                icon:'job',
                hide:this.props.user.type=="boss"
            },
            {
                path:'/msg',
                component:Msg,
                icon:'msg',
                title:'消息列表',
                text:'消息'
            },
            {
                path:'/user',
                component:User,
                icon:'user',
                title:'个人中心',
                text:'我'
            }];
        const {pathname} = this.props.location;
        const head = navList.find(v=>v.path==pathname);
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
                                <Route path={v.path}
                                       component={v.component}
                                       key={v.path}
                                ></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavBarLink data={navList}></NavBarLink>
            </div>
        )
    }
}
export default DashBoard