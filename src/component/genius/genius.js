// 牛人列表
import React from 'react';
import UserCard from '../usercard/usercard';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component{
    componentDidMount(){
        // ! 因为这里要单独使用所有boss的信息，所以，要设计成传用户的类型进去，就获取这类用户的所有用户
        // ! 这样，当需要使用牛人的信息时，只需要传genius进去，就可以获取所有的牛人用户
        this.props.getUserList('boss');
    }
    render(){
        return (
            <UserCard data={this.props.userlist}></UserCard>
        )
    }
}

export default Genius;