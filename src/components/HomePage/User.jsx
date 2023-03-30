import React from "react";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
const User = () => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          Thông tin
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar size="default" icon={<UserAddOutlined />} src=""></Avatar>
            <span>Vũ Hoàng</span>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default User;
