import React from 'react';
import Logo from '../../component/logo/logo';
import {WingBlank,WhiteSpace,InputItem,List,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
@connect(
    (state)=>{
        return state.user;
    },
    // 下面是ES6语法，解构赋值。ES5的写法：{login:login}
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
        // ! 在组件中不处理数据逻辑，让redux处理。数据逻辑 <==> 业务逻辑
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
                {/* 如果登录成功，则跳转到指定的页面，否则，则不进行操作 */}
                {/* ! 这里原本的判断条件是this.props.redirectTo,这导致了【重复重定向】的问题：
                    当在用户中心点击退出登录是,user.js中设置了重定向到redirectTo的值为/login
                    所以，它会跳转到login页面，但是，当跳转到这个页面时，因为redirectTo的值被设置为/login,
                    所以，this.props.redirectTo就为真,然后，就执行后面的<Redirect to={this.props.redirectTo}></Redirect>
                    这样，就有跳转了一次，从而，造成了这个【重复重定向】的问题.
                    因此，我将跳转的条件改为了根据用户是否存在，即用户是否为登录状态。
                */}
                {this.props.user?<Redirect to={this.props.redirectTo}></Redirect>:null}
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

