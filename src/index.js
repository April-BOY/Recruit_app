import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Login from './container/login/login.js';
import Register from './container/register/register.js'
import './index.css';
//! 在index.js 中引入配置文件，这样，项目中凡是有axios实现的请求和响应都会使用这个配置文件
import './config';
import App from './App';

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </Switch>
        </div>
    </BrowserRouter>
</Provider>, document.getElementById('root'));