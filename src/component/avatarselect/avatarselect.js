import React from 'react';
import {List,Grid} from 'antd-mobile';

class AvatarSelect extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    render(){
        const avatarList = ['boy','bull','chick','crab','girl','hedgehog','hippopotamus','koala','lemur','man','pig','tiger','whale','woman','zebra'].map(v=>{
            return {
                icon: require(`../img/${v}.png`),
                text: v,
            }
         });
        const gridHeader = this.state.ele?(
            <div>
                <span>已选择头像</span>
                <img src={this.state.ele.icon} style={{width:20,paddingLeft:5}} />
            </div>
        ):(<div>请选择头像</div>)
        return (
            <div>
                <List renderHeader={gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={ele=>{
                            this.setState({ele});
                            // 将头像的名字传给geniusinfo页面，然后，存入数据库。
                            //! 传头像的名字的原因是：当需要使用头像时，可以直接使用头像的名字拼接出头像的路径
                            this.props.selectAvatar(ele.text);
                        }}
                    >
                    </Grid>
                </List>
            </div>
        )
    }
}

export default AvatarSelect;