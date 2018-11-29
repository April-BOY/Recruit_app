// 数据库

const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/bosschat";
mongoose.connect(DB_URL);

const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String,require:true},
        'desc':{type:String,require:true},
        'title':{type:String,require:true},
        'company':{type:String,require:true},
        'money':{type:String,require:true}
    },
    chat:{
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'content':{type:String,require:true},
        //! 数据库记录的时间类型一般是Number类型,因为一般不会存某年某月某号，
        //! 一般是存距离1970年1月1号的毫秒数，所以，设置成Number类型
        'create_time':{type:Number,require:true},
        // 是否被阅读，一开始默认是未读
        'read':{type:Boolean,default:false},
        // ! chatid是这张表的关键，它由聊天的两个人的id组成
        // ! 所以，要找两个人的聊天纪录就可以通过chatid来找
        'chatid':{type:String,require:true}
    }
};

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
};