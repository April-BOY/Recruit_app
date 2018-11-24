const express = require('express');
const Router = express.Router();
const utils = require('utility');
const model = require('./model');
const User = model.getModel('user');

const _filter = {'pwd':0,"__v":0}
//查看数据库中user表的内容
Router.get('/list',(req,res)=>{
    const {type} = req.query;
    User.find({type},_filter,(err,doc)=>{
        res.json({code:0,data:doc})
    })
});
//清空user表中的数据
Router.get('/remove',(req,res)=>{
    User.remove({},()=>{})
});
Router.post('/register',(req,res)=>{
    let {user,pwd,type} = req.body;
    User.findOne({user},_filter,(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:"用户名已被注册"})
        }
        pwd = md5Pwd(pwd);
        User.create({user,pwd,type},(err,doc)=>{
            if(err){
                return res.json({code:1,msg:"后台出错了"})
            }
            res.cookie('userid',doc._id)
            return res.json({code:0,data:doc})
        })
    })
});
Router.post('/login',(req,res)=>{
    let {user,pwd} = req.body;
    pwd = md5Pwd(pwd);
    User.findOne({user,pwd},_filter,(err,doc)=>{
        if(!doc){
            return res.json({code:1,msg:"用户名或密码错误"})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
});

Router.get('/info',(req,res)=>{
    const {userid} =req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({code:1,msg:"后台出错了"})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
});

Router.post('/update',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1,msg:"用户不存在"})
    };
    User.findByIdAndUpdate(userid,req.body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },req.body);
        return res.json({code:0,data})
    })
})
function md5Pwd(pwd){
    const salt = "fk;sl#@$$^%$#!&(*dir092384032421f5s4dfE@#$@#$1213123";
    return utils.md5(utils.md5(pwd+salt));
}



module.exports = Router;