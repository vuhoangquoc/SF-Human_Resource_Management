import React from 'react';
import { Layout,Typography } from 'antd';
import SigninForm from '../../components/SignFrom/SigninFrom';
import BackgroundImage from "../../images/12.png";

const { Content } = Layout;
const { Title } = Typography;

function SigninPage() {
  return (
    <div>
      <Layout style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh'
        }} 
      >
        <Content style={{
          width: 500,
          margin: '5% auto',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          boxShadow: '0 0 35px 15px #FFFFCC',
          borderRadius: 5,
          }}
        > 
           <Title level={1} style={{textAlign: "center"}}>SIGN IN </Title>
          <SigninForm/>
          
        </Content>
      </Layout>
    </div>
  )
}

export default SigninPage;