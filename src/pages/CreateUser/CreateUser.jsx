import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Card, Form, Input } from "antd";
import userApi from "../../api/moudules/user.api";

const CreateUser = () => {
  const form = useRef();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const password = Math.random().toString(36).slice(-8);
  const sendEmail = (e) => {
    e.preventDefault();
    const values = {
      username,
      password,
      confirmPassword: password,
      displayName,
    };
    const { response, err } = userApi.signup(values);
    console.log(response, err);
    emailjs
      .sendForm(
        "service_8brwz8p",
        "template_freck8p",
        form.current,
        "_xOmm2TyIKMf4UiUa"
      )
      .then(
        (result) => {
          alert("Gửi thành công");
        },
        (error) => {
          alert("Error");
        }
      );
  };

  return (
    <Card title="Đăng ký">
      <form ref={form} onSubmit={sendEmail}>
        <Form.Item>
          <Input
            type="text"
            name="display_name"
            placeholder="Tên người dùng"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            style={{ width: 350 }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="text"
            name="user_name"
            placeholder="Tài khoản"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            style={{ width: 350 }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="email"
            name="user_email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: 350 }}
          />
        </Form.Item>
        <Form.Item hidden>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: 100 }}>
            Gửi
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default CreateUser;
