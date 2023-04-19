import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Card, Form, Input } from "antd";

const CreateUser = () => {
  const form = useRef();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const password = Math.random().toString(36).slice(-8);
  // const formData = new FormData(form.current);
  // formData.append("password", password);
  const sendEmail = (e) => {
    e.preventDefault();

    // const templateParams = {
    //   // user_email: email,
    //   // user_name: username,
    //   password: password,
    // };

    emailjs
      .sendForm(
        "service_8brwz8p",
        "template_freck8p",
        form.current,
        "_xOmm2TyIKMf4UiUa"
      )
      .then(
        (result) => {
          alert("Done");
        },
        (error) => {
          alert("Error");
        }
      );
  };

  return (
    <Card>
      <form ref={form} onSubmit={sendEmail}>
        <Form.Item>
          <Input
            type="text"
            name="user_name"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
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
          />
        </Form.Item>
        <Form.Item hidden>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default CreateUser;

// import React, { useState } from "react";
// import { Form, Input, Button, Modal } from "antd";
// import emailjs from "@emailjs/browser";
// import { enc, lib } from "crypto-js";

// const CreateUser = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const templateParams = {
//       user_email: email,
//       user_name: username,
//       password: generateRandomPassword(),
//     };

//     emailjs
//       .send(
//         "service_8brwz8p",
//         "template_freck8p",
//         templateParams,
//         "_xOmm2TyIKMf4UiUa"
//       )
//       .then(() => {
//         alert("Done");
//       })
//       .catch(() => {
//         alert("Fail");
//       });
//   };

//   const generateRandomPassword = () => {
//     const chars =
//       "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const length = 8; // or any other desired length
//     const bytes = lib.WordArray.random(length);
//     const password = bytes.map((byte) => chars[byte % chars.length]).join("");

//     return enc.Base64.stringify(enc.Utf8.parse(password));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Item>
//         <Input
//           name="user_email"
//           placeholder="Email"
//           value={email}
//           onChange={handleEmailChange}
//         />
//       </Form.Item>
//       <Form.Item>
//         <Input
//           name="user_name"
//           placeholder="Username"
//           value={username}
//           onChange={handleUsernameChange}
//         />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default CreateUser;
