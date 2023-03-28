import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPages from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';
import store from './Redux/Store';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider  store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<App />}/>
          <Route path='/Register' element ={<RegisterPage />}/>
          <Route path='/Login' element ={<LoginPages />}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
