import React, { useState } from 'react';
import { Input, Button, Form, Typography,Alert, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signUpser } from '../../Redux/Reducer/registerSlice';


const { Title } = Typography;

const RegisterFrom= () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();

  const registerHandle = () =>{
    console.table(name,email,password);
    dispatch(signUpser({name,email,password}));
  } 

return (
  <>
  <Title level={1} style={{color: "#ebe6e6",textAlign: "center",}}>
    Register
  </Title>
  <Form
    style={{
      marginTop:'1%',
      color: '#ebe6e6'}}
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}
    >
    <Form.Item
      style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
      name="username"
      rules={[{
        required: true,
        message: 'Please input your Username!',
      },]}
    >
      <Input  value={name} onChange ={(e) => setName(e.target.value)}
        type = "text"
        prefix={<UserOutlined  />} 
        placeholder="Username" />
    </Form.Item>

    <Form.Item
      name="email" noStyle
      rules={[{
        type: 'email',
        message: 'The input is not valid E-mail!',
        },{
          required: true,
          message: 'Please input your E-mail!',
        },]}>
      <Input  value={email} onChange ={(e) => setEmail(e.target.value)}
        placeholder = "Email" />
    </Form.Item>

    <Form.Item style={{fontWeight: "bold", marginBottom: "10%", marginTop: "10%"}}
      name="password"
      rules={[{
        required: true,
        message: 'Please input your Password!',
      },]}
    >
      <Input value={password} onChange ={(e) => setPassword(e.target.value)}
        prefix={<LockOutlined  />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>

    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form.Item>

    <Form.Item style={{textAlign: "center", marginTop: "28%"}}>
      <Button onClick={registerHandle}
        type="primary"
        htmlType="submit" >
            Register
      </Button>
    </Form.Item>
  </Form>
</>
  );
};

export default RegisterFrom;