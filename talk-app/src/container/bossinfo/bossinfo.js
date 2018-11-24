import React from "react";
import {NavBar,Button,InputItem,TextareaItem,List} from "antd-mobile"
import {Redirect} from "react-router-dom"
import AvatarSelect from "../../component/avatarselect/avatarselect"
import {connect} from "react-redux";
import {update} from "../../redux/user.redux";
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(){
        super();
        this.state={
            title:'',
            desc:'',
            avatar:'',
            company:'',
            money:''
        };
        this.handleSelectAvatar = this.handleSelectAvatar.bind(this)
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    handleSelectAvatar(imgname){
        this.setState({
            avatar:imgname
        })
    }
    render(){
        const redirect = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (
            <div>
                {
                    redirect&&(redirect!=path)?(<Redirect to={redirect}></Redirect>):null
                }
                <NavBar mode="dark">BOSS完善信息首页</NavBar>
                <AvatarSelect selectAvatar={this.handleSelectAvatar}></AvatarSelect>
                <List>
                    <InputItem onChange={(v)=>{this.handleChange('title',v)}}>招聘岗位</InputItem>
                    <InputItem onChange={(v)=>{this.handleChange('company',v)}}>公司名称</InputItem>
                    <InputItem onChange={(v)=>{this.handleChange('money',v)}}>薪资待遇</InputItem>
                    <TextareaItem
                        title="职位要求"
                        rows={3}
                        onChange={(v)=>{this.handleChange('desc',v)}}
                    />
                    <Button type="primary" onClick={()=>this.props.update(this.state)}>保存</Button>
                </List>


            </div>
        )
    }
}

export default BossInfo;