import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom"
import {createStore,applyMiddleware,compose } from "redux";
import reducer from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import Login from "./container/login/login"
import AuthRoute from "./component/authroute/authroute"
import Register from "./container/register/register"
import BossInfo from "./container/bossinfo/bossinfo"
import GeniusInfo from "./container/geniusinfo/geniusinfo"
import DashBoard from "./component/dashboard/dashboard"
import "./config"
import "./index.css"
const store = createStore(reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route component={DashBoard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
),document.getElementById('root'));