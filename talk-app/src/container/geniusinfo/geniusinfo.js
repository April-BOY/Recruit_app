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
class GeniusInfo extends React.Component{
    constructor(){
        super();
        this.state={
            title:'',
            desc:'',
            avatar:''
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
                <NavBar mode="dark">牛人完善信息首页</NavBar>
                <AvatarSelect selectAvatar={this.handleSelectAvatar}></AvatarSelect>
                <List>
                    <InputItem onChange={(v)=>{this.handleChange('title',v)}}>求职岗位</InputItem>
                    <TextareaItem
                        title="个人简历"
                        rows={3}
                        onChange={(v)=>{this.handleChange('desc',v)}}
                    />
                    <Button type="primary" onClick={()=>this.props.update(this.state)}>保存</Button>
                </List>


            </div>
        )
    }
}

export default GeniusInfo;