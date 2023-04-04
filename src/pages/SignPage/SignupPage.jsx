import React from 'react'
import { Layout } from 'antd';
import SignupForm from '../../components/SignFrom/SignupFrom';
import BackgroundImage from "../../images/12.png";

const { Content } = Layout;
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
          <SignupForm/>
          
        </Content>
      </Layout>
    </div>
  )
}

export default SignupPage;
