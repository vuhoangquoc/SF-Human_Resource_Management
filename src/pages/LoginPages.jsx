import React from 'react';
import { Layout } from 'antd';
import LoginForm from '../components/Login/LoginFrom';


const { Header, Content } = Layout;

function LoginPages() {
  return (
    <Layout style={{backgroundImage: " linear-gradient(to top, #30cfd0 0%, #330867 100%)"}}>
      <Content style={{ padding: '15% 30% 30% 30%' }}>
        <Header>
        <div className="logo" />
        <h1 style={{ color: '#F5F5F5' }}>Login</h1>
      </Header>
      <LoginForm />
      </Content>
    </Layout>
  );
}

export default LoginPages;