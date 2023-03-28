import React, { useState } from 'react';
import { Input, Button, Form, Typography,Alert, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout, signInUser } from '../../Redux/Reducer/registerSlice';

const { Title } = Typography;

const LoginForm = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () =>{
    console.log(email,password);
    dispatch(signInUser({email,password}))
  }

  const logouthandle = () =>{
    dispatch(logout);
  }
  return (
<>
  <Title level={1} style={{color: "#ebe6e6",textAlign: "center",}}>
    Login </Title>
    
  <Form
    style={{
      marginTop:'1%',
      color: '#ebe6e6'}}
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}>

    <Form.Item
      style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
      name="username"
      rules={[{
        required: true,
        message: 'Please input your Username!',
      },]}
    >
      
      <Input alue={email} onChange ={(e) => setEmail(e.target.value)}
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Email"        
      />
    </Form.Item>


    <Form.Item style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },]}
      >
      
      <Input value={password} onChange ={(e) => setPassword(e.target.value)}
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"    
      />
      
    </Form.Item>

    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <a className="login-form-forgot" href="http://localhost:3000/Register">
        Forgot password
      </a>
    </Form.Item>

    <Form.Item style={{textAlign: "center", marginTop: "35%"}}>
      <Button onClick={handleLogin}
        type="primary" 
        htmlType="submit" 
        className="login-form-button">
          Log in
      </Button>
      <Button onClick={logouthandle}
        type="primary" 
        htmlType="submit" 
        className="login-form-button">
          logout
      </Button>
        Or <a href="http://localhost:3000/Register">register now!</a>
    </Form.Item>
  </Form>
</>
  );
};

export default LoginForm;