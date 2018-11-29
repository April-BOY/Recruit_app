import React from 'react';
import {NavBar,List,Button,InputItem,TextareaItem} from 'antd-mobile';
import AvatarSelect from '../../component/avatarselect/avatarselect.js';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';

@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'',
            desc:'',
            avatar:'',
            company:'',
            money:''
        }
        this.handleSelectAvatar = this.handleSelectAvatar.bind(this);
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        });
    }
    handleSelectAvatar(imgname){
        this.setState({
            avatar:imgname
        });
    }
    render(){
        const redirect = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (
            <div>
                {redirect&&(redirect!==path)?(<Redirect to={redirect}></Redirect>):null}
                <NavBar mode="dark">牛人完善信息首页</NavBar>
                {/*! handleSelectAvatar不加圆括号的原因是：这个函数是传给avatarselect.js使用的，不需要在这里执行
                    而下面的handleChange是需要实时执行修改state的值的，所以，需要加圆括号调用
                */}
                <AvatarSelect selectAvatar={this.handleSelectAvatar}></AvatarSelect>
                <List>
                    <InputItem onChange={(v)=>{this.handleChange('title',v)}}>招聘岗位</InputItem>
                    <InputItem onChange={(v)=>{this.handleChange('company',v)}}>公司名称</InputItem>
                    <InputItem onChange={(v)=>{this.handleChange('money',v)}}>薪资待遇</InputItem>
                    <TextareaItem
                        title="职位要求"
                        rows={3}
                        onChange={(v)=>{this.handleChange('desc',v)}}
                    ></TextareaItem>
                    {/* 保存即将上面这些新的数据插入到原来的用户的数据中：
                        实现的思路：
                        找到用户的id，然后，将新的数据插入到用户原来的数据中(即存入数据库中)，
                        并且更新当前整体的redux的state的数据

                        这里的this.state就是指用户输入的title:'',desc:'',avatar:''的数据
                    */}
                    <Button type="primary" onClick={()=>this.props.update(this.state)}>保存</Button>
                </List>
            </div>
        )
    }
}

export default BossInfo;