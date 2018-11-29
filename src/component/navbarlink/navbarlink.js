// dashboard组件中底部的标签栏组件
import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class NavBarLink extends React.Component{
    render(){
        const navList = this.props.data.filter(v=>{
    // ! hide:this.props.user.type=="genius",访问boss页面时，这里就为false，取反就为true，
    // ! hide:this.props.user.type=="boss",访问boss页面时，这里就为true，取反就为false
    // ! 然后，就显示boss页面。访问genius页面则反之
            return !v.hide;
        });
        // console.log(navList);
        const pathname = this.props.location.pathname;
        return (
            <div style={{position:"fixed",bottom:0,right:0,left:0}}>
                <TabBar>
                {
                    navList.map(v=>(
                        <TabBar.Item
                            title={v.text}
                            key={v.path}
                            icon={{uri:require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                            //! 通过路由实现是否选中的状态
                            selected={v.path==pathname}
                            badge={v.path=="/msg"?12:0}
                            onPress={()=>{
                                this.props.history.push(v.path);
                            }}
                        >
                        </TabBar.Item>
                    ))
                }      
                </TabBar>
            </div>
        )
    }
}

export default NavBarLink;