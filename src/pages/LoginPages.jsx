import React from 'react';
import { Layout } from 'antd';
import LoginForm from '../components/Login/LoginFrom';


const { Content } = Layout;

function LoginPages() {
  return (
     <Layout style={{
      backgroundImage: " linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      height: '100vh'
      }} >
      <Content style={{
      width: 500,
      margin: '5% auto',
      display: 'flex',
      flexDirection: 'column',
      // backgroundColor: 'white',
      padding: 20,
      boxShadow: '0 0 20px 8px #bfbfbf',
      borderRadius: 5,
   
    }} >
       
      <LoginForm />
      </Content>
    </Layout>
  );
}

export default LoginPages;
 