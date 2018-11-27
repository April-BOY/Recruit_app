import React from 'react';
import Logo from '../../component/logo/logo';
import {WingBlank,WhiteSpace,InputItem,List,Button,Radio} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
@connect(
    /**
    * * ES5的写法：
    * * (state)=>{
    * * return state.user;
    * * }
    * *
    */
    //es6的写法
    state=>state.user,
    // 下面是ES6语法，解构赋值。ES5的写法：{login:login}
    {register}
)
class Register extends React.Component{
    constructor(){
        super();
        // Login组件自己的状态数据
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'boss'
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }
    handleLogin(){
        this.props.history.push('/login');
    }
    register(){
        this.props.register(this.state);
    }
    handleChange(key,v){
        this.setState({
            //! 这里不能写成"key":v，因为这样写key会被解析成字符串，而不是一个变量
            [key]:v
        })
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                {/* 如果注册成功，则跳转到指定的页面，否则，则不进行操作 */}
                {this.props.redirectTo?<Redirect to="this.props.redirectTo"></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {/*! 
                        (1) antd-mobile文档表示InputItem的这个组件会
                        返回一个string类型的值，所以，这个可以写一个回调函数。
                        通过打印返回的值 (v)=>{console.log(v)} 确认这是用户输入的内容
                        (2) handleChange()接收两个形参，第一个表明修改的是表单中的哪一个值，
                        第二个就是修改的内容
                        */}
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
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
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;

