// 用户中心
import React from 'react';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import cookies from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';


@connect(
    // 因为只需要用户的信息，所以，不需要扩展chatuser表过来
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout() {
        const alert = Modal.alert;
        alert('注销','确认退出登录吗???',[
            {text:'取消',onPress:()=>console.log('cancel'),style:'default'},
            {text:'确认',onPress:()=>{
                // 清除cookie
                cookies.erase('userid');
                // 将 state 置为初始状态
                this.props.logoutSubmit();
            }}
        ]);
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            this.props.user?(<div>
                <Result 
                img={(<img style={{width:50}} src={require(`../img/${this.props.avatar}.png`)} alt="用户个人头像" />)}
                title={this.props.user}
                message={this.props.type=="boss"?this.props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item>
                        {this.props.title}
                        {
                            this.props.desc.split('\n').map(d=>(
                                <Brief key={d}>{d}</Brief>
                            ))
                        }
                        {
                            this.props.money?(<Brief>薪资待遇：{this.props.money}</Brief>):null
                        }
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>):(<Redirect to={this.props.redirectTo}></Redirect>)
        )
    }
}

export default User;