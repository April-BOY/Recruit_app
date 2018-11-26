import React from 'react';
import Logo from '../../component/logo/logo';
import {WithBlank,WhiteSpace,InputItem,List,Button,Radio} from 'antd-mobile'
import {login} from '../../redux/user.redux';

@connect(
    null,
    {login}
)
class Login extends React.Component{
    constructor(){
        super();
        // Login组件自己的状态数据
        this.state = {
            user:'',
            pwd:''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }
    handleLogin(){
        // ! 在组件中不处理数据逻辑，数据逻辑 <==> 业务逻辑
        this.props.login({user:this.state.user,pwd:this.state.pwd});
    }
    register(){
        //! 路由组件的history属性上的push方法用于跳页，vue中也是使用(router.push('index'))push方法进行跳页
        this.props.history.push('/register');
    }
    handleChange(key,v){
        this.setState({
            //! 这里不能写成"key":v，因为这样写key会被解析成字符串，而不是一个变量
            [key]:v
        })
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                <WithBlank>
                    <List>
                        {/*! 
                        (1) antd-mobile文档表示InputItem的这个组件会
                        返回一个string类型的值，所以，这个可以写一个回调函数。
                        通过打印返回的值 (v)=>{console.log(v)} 确认这是用户输入的内容
                        (2) handleChange()接收两个形参，第一个表明修改的是表单中的哪一个值，
                        第二个就是修改的内容
                        */}
                        <InputItem onChange={(v)=>{this.handleChange('user',v)}}>用户</InputItem>
                        <InputItem onChange={(v)=>{this.handleChange('pwd',v)}}>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register}>注册</Button>
                </WithBlank>
            </div>
        )
    }
}

export default Login;

