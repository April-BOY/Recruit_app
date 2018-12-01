import React from 'react';
import {NavBar,InputItem,List,Icon} from 'antd-mobile';
import {sendMsg,readMsg} from '../../redux/chat.redux';
import {connect} from 'react-redux';
import {getChatId} from '../../util';

@connect(
    state=>state,
    {sendMsg,readMsg}
)
class Chat extends React.Component{
    constructor(){
        super();
        this.state={
            text:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // 进入这个页面时，未读消息变为已读
    componentWillUnmount(){
        // 获取发消息给当前用户的那个人的id
        const from = this.props.match.params.id;
        this.props.readMsg(from);
    }
    handleSubmit(){
        this.props.sendMsg({
            // 把当前用户的id和目标用户的id(因为需要这两个id，合并chatid记录聊天的信息)，还有聊天的内容发给后台
            from:this.props.user._id,
            to:this.props.match.params.id,
            msg:this.state.text
        });
        // 消息发送给后台后，就将用户的输入置空
        this.setState({
            text:''
        });
    }
    render(){
        // 和用户聊天的那个人的id
        const targetid = this.props.match.params.id;
         //! 获取当前的用户的所有信息，因为state=>state引入了所有的表，所以，这里的user
        //! 不是指user表中的initState中的属性user，而是指user.redux.js这张表
        const me = this.props.user;
        // 获取跟当前用户聊天的目标用户
        //! 因为users是一个对象，id用户的id是它里面的属性，这里用到的是[]访问对象的属性的语法
        const to = this.props.chat.users[targetid];
        // 需要根据聊天对象进行过滤，因为这里获取到的是所有跟当前用户进行过聊天的记录
        // 需要过滤成点击某个人进行聊天时，只显示和那个人的聊天记录
        // const chatmsgs = this.props.chat.chatmsgs;
        // 过滤
        const chatmsgs = this.props.chat.chatmsgs.filter(v=>v.chatid===getChatId(me._id,targetid));
        const Item = List.Item;
        //! 解决第60行：{to.name}获取不到name属性的问题。
        // 因为初始化的时候to这个对象是不存在的，只有执行MSG_LIST这个动作之后to才会存在
        if(!to||!me){
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={()=>{
                            this.props.history.goBack();
                        }}
                >
                 {to.name}
                </NavBar>
                {
                    chatmsgs.map(v=>(
                        // 如果聊天信息是当前用户发送的信息，则返回当前用户的头像和聊天记录，并显示在聊天界面的右边
                        // 否则，则是目标用户发送的信息，也将目标用户的头像和聊天记录返回，并显示在聊天界面的左边
                        v.from===this.props.user._id?(
                            <Item key={v._id}
                                className="chat-me"
                                extra={<img src={require(`../img/${me.avatar}.png`)} alt="用户的头像" />}
                            >{v.content}</Item>
                        ):(<Item key={v._id}
                                thumb={require(`../img/${to.avatar}.png`)}
                        >{v.content}</Item>)
                    ))
                }
                <div className="stick-footer">
                    <List>
                        <InputItem 
                            placeholder="请输入"
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                            value={this.state.text}
                            onChange={v=>this.setState({text:v})}
                        />
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;