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
    // 获取路由中传过来的参数type
    const {type} = req.query;
    // ES5的写法：User.find({type:type},(err,doc)=>{
    //* 因为chatuser.redux.js中的getUserList()需要根据用户类型查找信息，所以，改造成如下形式 
    User.find({type},_filter,(err,doc)=>{
        res.json({code:0,data:doc});
    });
    //* 原本的辅助开发的接口：查看user表中所用用户的内容
    // User.find({},(err,doc)=>{
    //     res.json({code:0,data:doc});
    // });
});
// 清空user表中的数据
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
            // cookie是cookie-parser提供的方法，用于将用户信息写入cookie中
            res.cookie('userid',doc._id);
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
           return res.json({code:1,msg:"用户名或密码错误"});
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    });
});

// 处理cookie的接口
Router.get('/info',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
       return res.json({code:1});
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
           return res.json({code:1,msg:"后台出错了"});
        }
        if(doc){
            return res.json({code:0,data:doc});
        }
    });
});

// 将用户的信息完善页输入的信息存入数据库中,即在用户原有的信息(用户名，密码)上添加新的信息
Router.post('/update',(req,res)=>{
    // console.log(req.body);req.body获取的数据包括：头像、岗位、个人简历这三项内容
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:"用户不存在"});
    }
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
        // !这里的assign函数<==>扩展运算符.第一个{}表示一个空对象，扩展后的内容将会存入这个对象中，并将这个对象返回.
        // ! 所以，最终data将得到一个对象：{user,type,avatar,title,desc}
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },req.body);
        return res.json({code:0,data});
    });
})

function md5Pwd(pwd){
    // 加盐
    const salt = "fae87982030)()()***7**^%&^！@";
    return utils.md5(utils.md5(pwd+salt));
}
module.exports = Router;