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