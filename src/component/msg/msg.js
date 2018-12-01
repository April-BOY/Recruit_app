// 消息列表组件，即牛人和boss聊天的消息列表
import React from 'react';
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';


@connect(
    state=>state
)
class Msg extends React.Component{
    render(){
        // 对聊天记录进行分组
        const msgGroup = {};
        this.props.chat.chatmsgs.forEach(v=> {
            msgGroup[v.chatid] = msgGroup[v.chatid]||[];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup);
        // 对聊天记录按时间进行排序
        chatList.sort((a,b)=>{
            const aTime = a[a.length-1].create_time;
            const bTime = b[b.length-1].create_time;
            return bTime-aTime;
        });
        // 获取当前用户的id
        const userid = this.props.user._id;
        // 获取所有用户的头像和用户名
        const userInfo = this.props.chat.users;
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div>
                <List>
                    {
                        chatList.map(v=>{
                            // 获取两个人两天的最后一条消息(即最新的消息)
                            const lastItem = v[v.length-1];
                            // 获取跟当前用户聊天的用户的id
                            const targetid = lastItem.from===userid?lastItem.to:lastItem.from;
                            // 未读消息的数量
                            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length;
                            // 因为获取目标用户的信息需要时间，所以，为了避免错误，加一个判断
                            // 如果目标用户不存在，则返回null
                            if(!userInfo[targetid]){
                                return null;
                            }
                            return (
                                <List key={lastItem._id}>
                                    <Item
                                        thumb={require(`../img/${userInfo[targetid].avatar}.png`)}
                                        extra={(<Badge text={unreadNum}></Badge>)}
                                        arrow='horizontal'
                                        onClick={()=>{this.props.history.push(`chat/${targetid}`)}}
                                    >
                                    <Brief>{userInfo[targetid].name}</Brief>
                                    {lastItem.content}
                                    </Item>
                                </List>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default Msg;