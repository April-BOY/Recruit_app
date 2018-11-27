// 用户数据接口

const express = require('express');
const Router = express.Router();
const utils = require('utility');

// 导入数据库中的user表
const model = require('./model');
const User = model.getModel('user');

/**
* ! 过滤掉用户的密码，防止被开发者或其他人看到
* ! 过滤掉返回的__v这个参数，因为这个参数没用
* *
*/
const _filter = {'pwd':0,'__v':0};

//! 用于辅助自己开发使用的接口，比如：查看数据库中所有的数据，删除数据库中所有的数据
Router.get('/list',(req,res)=>{
    User.find({},(err,doc)=>{
        res.json({code:0,data:doc});
    });
});

Router.get('/remove',(req,res)=>{
    User.remove({},()=>{});
});

Router.post('/register',(req,res)=>{
    // console.log(req.body);
    let {user,pwd,type} = req.body;
    // ! 为什么过滤条件_filter写在这个位置？
    //￥ 这是mongodb的过滤查询：属性过滤 find(Conditions,field,callback);
    //￥ 整理来源：http://cw.hubwiz.com/card/c/543b2e7788dba02718b5a4bd/1/3/2/
    User.findOne({user},_filter,(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:"用户名已被注册"});
        }
        pwd = md5Pwd(pwd);
        User.create({user,pwd,type},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:"后台出错了"});
            }
            // ! 这里响应的数据可以在浏览器的 Network 面板中查看
            return res.json({code:0,data:doc});
        });
    })
});

Router.post('/login',(req,res)=>{
    // console.log(req.body);
    let {user,pwd} = req.body;
    // ! 当用户输入密码时，必须进行md5加密再去查询，因为注册的时候密码已经加密，如果不加密就去数据库中查询，
    // ! 肯定是无法匹配的，所以，这里也要先加密
    pwd = md5Pwd(pwd);
    User.findOne({user},_filter,(err,doc)=>{
        if(!doc){
            res.json({code:1,msg:"用户名或密码错误"});
        }
        return res.json({code:0,data:doc});
    });
});

function md5Pwd(pwd){
    // 加盐
    const salt = "fae87982030)()()***7**^%&^！@";
    return utils.md5(utils.md5(pwd+salt));
}
module.exports = Router;