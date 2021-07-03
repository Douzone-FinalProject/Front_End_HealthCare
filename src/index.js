import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'index.css';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'redux/root-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { addAuthHeader } from "apis/axiosConfig";
import { createSetAuthTokenAction, createSetUidAction } from 'redux/auth-reducer';

const store = createStore(rootReducer, composeWithDevTools());

//Redux에 인증 정보 설정
store.dispatch(createSetUidAction(sessionStorage.getItem("staff_login_id") || ""));
store.dispatch(createSetAuthTokenAction(sessionStorage.getItem("authToken") || ""));

//Axios에 인증 헤더 추가
if(sessionStorage.getItem("authToken")) {
  addAuthHeader(sessionStorage.getItem("authToken"));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
