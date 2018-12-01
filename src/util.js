//公共的方法
// ! 这些公共的方法是给前端页面使用的，后台最好不要使用。
// ! 比如，在server.js中拼接聊天的两个人的id时，就不要使用这里的getChatId()方法

// 某项操作成功后，设置要跳转的路由
//! 因为这个方法是接收action.payload返回的数据，这个数据是一个对象，所以，形参为{type,avatar}
export function getRedirectPath({type,avatar}){
    // 注册==登录==完善信息(geniusinfo,bossinfo)==用户(genius，boss)中心
    let url = (type==="boss")?"boss":"genius";
    /**
    * * 注册成功后
    * * 如果用户的头像不存在，则说明用户的信息没有完善，要跳转到完善信息页面
    * * 如果用户的头像存在，则说明用户的信息已完善，跳转到用户中心
    * *
    */
   if(!avatar){
        url += "info";
   }
   return url;
}


//! 将聊天的两个人的id合成一个id(小的id在前，大的在后)，便于查找聊天的记录
export function getChatId(userId,targetId){
     return [userId,targetId].sort().join('_');
}