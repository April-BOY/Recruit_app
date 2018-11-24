import React from "react";
import Logo from "../../component/logo/logo"
import {WingBlank,WhiteSpace,InputItem,List,Button,Radio} from "antd-mobile"
import {connect} from "react-redux"
import {register} from "../../redux/user.redux";
import {Redirect} from "react-router-dom"
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'boss'
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this)
    }
    handleLogin(){
        this.props.history.push('/login');
    }
    register(){
        this.props.register(this.state)
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?(<Redirect to={this.props.redirectTo}></Redirect>):null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={(v)=>{this.handleChange('user',v)}}>用户</InputItem>
                        <InputItem type="password" onChange={(v)=>{this.handleChange('pwd',v)}}>密码</InputItem>
                        <InputItem type="password" onChange={(v)=>{this.handleChange('repeatpwd',v)}}>确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type=='genius'}
                            onChange={()=>{this.handleChange('type','genius')}}>牛人</RadioItem>
                        <RadioItem
                            checked={this.state.type=='boss'}
                            onChange={()=>{this.handleChange('type','boss')}}>BOSS</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;