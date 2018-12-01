// 牛人列表和boss列表中的卡片组，因为是同样的内容，所以，单独抽出来做一个组件
import React from 'react';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
    render(){
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {
                    this.props.data.map(v=>(
                        v.avatar?(
                            <Card
                            // ! 点击跳转到聊天页面，并把用户的id传过去以确认谁和谁聊天
                                key={v._id}
                                onClick={()=>{this.props.history.push(`/chat/${v._id}`)}}
                            >
                                <Card.Header
                                title={v.user}
                                // 用户头像
                                thumb={require(`../img/${v.avatar}.png`)}
                                // 招聘岗位/求职岗位
                                extra={<span>{v.title}</span>}
                                >
                                </Card.Header>
                                <Card.Body>
                                    {
                                        v.type==="boss"?(
                                            <div style={{marginBottom:5}}>公司：{v.company}</div>
                                        ):null
                                    }
                                    {v.desc.split('\n').map(d=>(
                                        <div key={d} style={{marginBottom:5}}>{d}</div>
                                    ))}
                                    {
                                        v.type==="boss"?(
                                            <div>薪资待遇：{v.money}</div>
                                        ):null
                                    }
                                </Card.Body>
                            </Card>
                        ):null
                    ))
                }
            </WingBlank>
        )
    }
}

export default UserCard;