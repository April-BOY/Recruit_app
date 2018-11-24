import React from "react"
import {TabBar} from "antd-mobile"
import {withRouter} from "react-router-dom"

@withRouter
class NavBarLink extends React.Component{
    render(){
        const navList = this.props.data.filter(v=>{
            return !v.hide
        });
        const pathname = this.props.location.pathname;
        return (
            <div style={{position:"fixed",bottom:0,left:0,right:0}}>
                <TabBar>
                    {
                        navList.map(v=>(
                            <TabBar.Item
                                title={v.text}
                                key={v.path}
                                icon={{uri:require(`./img/${v.icon}.png`)}}
                                selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                                selected={v.path==pathname}
                                badge={v.path=="/msg"?12:0}
                                onPress={() => {
                                    this.props.history.push(v.path)
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