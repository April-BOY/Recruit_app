import React from "react";
import Logo from "../../component/logo/logo"
import {WingBlank,WhiteSpace,InputItem,List,Button,Radio} from "antd-mobile"
import {connect} from "react-redux"
import {login} from "../../redux/user.redux"
import {Redirect} from "react-router-dom"
@connect(
    (state)=>{
        return state.user
    },
    {login}
)
class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            user:'',
            pwd:''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this)
    }
    handleLogin(){
        this.props.login({user:this.state.user,pwd:this.state.pwd});
    }
    register(){
        this.props.history.push('/register');
    }
    handleChange(key,v){
        this.setState({
           [key]:v
        })
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?(<Redirect to={this.props.redirectTo}></Redirect>):null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>{this.handleChange('user',v)}}>用户</InputItem>
                        <InputItem type="password" onChange={(v)=>{this.handleChange('pwd',v)}}>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;