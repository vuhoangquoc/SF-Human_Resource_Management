import React from 'react'
import { Layout,Typography } from 'antd';
import SignupForm from '../../components/SignFrom/SignupFrom';
import BackgroundImage from "../../images/12.png";

const { Content } = Layout;
const { Title } = Typography;
const SignupPage = () => {
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
          <Title level={1} style={{textAlign: "center", marginTop: "5px"}}>ĐĂNG KÝ  </Title>
          <SignupForm/>
          
        </Content>
      </Layout>
    </div>
  )
}

export default SignupPage;
