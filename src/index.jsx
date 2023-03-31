import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import SignupPage from './pages/SignPage/SignupPage';
import SigninPage from './pages/SignPage/SigninPage';
import store from './Redux/Store';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider  store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/App' element ={<App />}/>
          <Route path='/Signin' element ={<SigninPage />}/>
          <Route path='/Signup' element ={<SignupPage />}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
