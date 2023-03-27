import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Form, Typography,Alert, Checkbox } from 'antd';
import {
  setUsername,
  setPassword,
  setIsLoading,
  setError,
  setLoggedIn,
} from '../../Redux/Reducer/authSlice.jsx';
import { loginAPI } from '../../API/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;


const LoginForm = () => {

  const dispatch = useDispatch();
  const { username, password, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
    console.log(setUsername(e.target.value))
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
    console.log(setPassword(e.target.value))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    dispatch(setError(null));
    try {
      await loginAPI({ username, password });
      dispatch(setLoggedIn(true));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
 
  return (
 
<>
  <Title level={1} style={{color: "#ebe6e6",textAlign: "center",}}>
    Login Form</Title>
    {error && <Alert message={error} type="error" />}
  <Form
    style={{
      marginTop:'1%',
      color: '#ebe6e6'}}
      name="normal_login"
      className="login-form"
      initialValues={{
      remember: true,
  }}
    onFinish={handleSubmit}
>
  <Form.Item
    style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
    name="username"
    rules={[
      {
        required: true,
        message: 'Please input your Username!',
      },
    ]}
  >
    <Input value={username} onChange={handleUsernameChange}
     prefix={<UserOutlined className="site-form-item-icon" />} 
     placeholder="Username" />
  </Form.Item>
  <Form.Item style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
    name="password"
    rules={[
      {
        required: true,
        message: 'Please input your Password!',
      },
    ]}
  >
    <Input value={password} onChange={handlePasswordChange}
      prefix={<LockOutlined className="site-form-item-icon" />}
      type="password"
      placeholder="Password"
    />
  </Form.Item>
  <Form.Item>
    <Form.Item name="remember" valuePropName="checked" noStyle>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <a className="login-form-forgot" href="">
      Forgot password
    </a>
  </Form.Item>

  <Form.Item style={{textAlign: "center", marginTop: "35%"}}>
    <Button type="primary" htmlType="submit" className="login-form-button">
      Log in
    </Button>
    Or <a href="">register now!</a>
  </Form.Item>
</Form>
</>
  );
};

export default LoginForm;