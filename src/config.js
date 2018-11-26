// 通过axios的拦截器，对在服务器的数据请求发送前和数据响应时的loadging状态作统一的处理
import axios from 'axios'
import {Toast} from 'antd-mobile'

axios.interceptors.request.use((config)=>{
    Toast.loading("正在加载中",0);
    return config;
});

axios.interceptors.response.use((response)=>{
    // 数据响应时，就隐藏toast对话框
    Toast.hide();
    return response;
});