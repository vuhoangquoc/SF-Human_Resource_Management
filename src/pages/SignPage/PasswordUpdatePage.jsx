import React from 'react';
import { Layout,Typography } from 'antd';
import SigninForm from '../../components/SignFrom/PasswordUpdate';

const { Content } = Layout;
const { Title } = Typography;

function PasswordUpdate() {
  return (
    <div>
      <Layout style={{
        backgroundImage: 'linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
        height: '100vh'
        }} 
      >
        <Content style={{
          width: 500,
          margin: '5% auto',
          display: 'flex',
          flexDirection: 'column',
          padding: 40,
          boxShadow: '0 0 20px 8px #FFFFFF',
          borderRadius: 5,
          }}
        > 
           <Title level={1} style={{textAlign: "center",color: "white"}}> Đổi Mật Khẩu </Title>
          <SigninForm/>
        </Content>
      </Layout>
    </div>
  )
}

export default PasswordUpdate;