import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Page Not Found"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Đăng nhập
        </Button>
      }
    />
  );
};

export default NotFound;
