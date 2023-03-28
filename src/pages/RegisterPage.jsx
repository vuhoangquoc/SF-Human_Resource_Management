import React from 'react'
import RegisterFrom from '../components/Register/RegisterFrom'
import { Layout } from 'antd';

const { Content } = Layout;
const RegisterPage = () => {
  return (
    <div>
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
       
      <RegisterFrom />
      </Content>
    </Layout>
    </div>
  )
}

export default RegisterPage
 