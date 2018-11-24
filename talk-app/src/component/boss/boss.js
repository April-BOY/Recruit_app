import React from "react";
import UserCard from "../usercard/usercard"
import {connect} from "react-redux"
import {getUserList} from "../../redux/chatuser.redux"

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render(){
        return (
            <UserCard data={this.props.userlist}></UserCard>
        )
    }
}

export default Boss