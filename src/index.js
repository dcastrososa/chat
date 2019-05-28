import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
import * as serviceWorker from './serviceWorker';
import { IP_WS } from './system/Config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from "./store/reducers/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    user: userReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <ActionCableProvider url={IP_WS}>
     <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
     </Provider>
    </ActionCableProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
