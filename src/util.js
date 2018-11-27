//共用的方法

// 某项操作成功后，跳转到相应的页面
//! 因为这个方法是接收action.payload返回的数据，这个数据是一个对象，所以，形参为{type,avatar}
export function getRedirectPath({type,avatar}){
    // 注册==登录==完善信息(geniusinfo,bossinfo)==用户(genius，boss)中心
    let url = (type=="boss")?"boss":"genius";
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