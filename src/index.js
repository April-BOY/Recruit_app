import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router-dom";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Login from "./container/login/login.js";
import Register from "./container/register/register.js";
import BossInfo from './container/bossinfo/bossinfo.js';
import GeniusInfo from './container/geniusinfo/geniusinfo.js';
import Authroute from "./component/authroute/authroute.js";
import DashBoard from './component/dashboard/dashboard.js';
import Chat from './component/chat/chat.js';
import "./index.css";
//! 在index.js 中引入配置文件，这样，项目中凡是有axios实现的请求和响应都会使用这个配置文件
import "./config";

// 在redux中做路由跳转
const history = createHistory();
const reduxMiddleware = routerMiddleware(history);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Authroute />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          {/* 接收通过路由传过来的参数 */}
          <Route path="/chat/:id" component={Chat}/>
          <Route component={DashBoard} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
