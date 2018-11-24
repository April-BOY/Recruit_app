export function getRedirectPath({type,avatar}){
    //注册(register)==登录(login)===完善信息（geniusinfo,bossinfo）====用户（genius，boss）中心
    console.log(type)
    let url = (type=="boss")?'boss':'genius';
    if(!avatar){
        url+='info'
    }
    return url;
}