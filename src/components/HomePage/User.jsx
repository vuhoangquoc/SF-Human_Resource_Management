import React from "react";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
const User = () => {
  const user = {
    name: "Vũ Hoàng",
    image: "https://avatars.githubusercontent.com/u/103670048?v=4",
  };
  const items = [
    {
      key: "1",
      label: <Link to="/profile">Thông tin</Link>,
    },
    {
      key: "2",
      label: (
        <Link to="/">
          <div>Đăng xuất</div>
          {/* onClick={handleLogOut} */}
        </Link>
      ),
    },
  ];

  const items2 = [
    {
      key: "1",
      label: <Link to="/signin">Đăng nhập</Link>,
    },
    {
      key: "2",
      label: (
        <Link to="/signup">
          <div>Đăng ký</div>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown
        menu={
          user !== null
            ? {
                items,
              }
            : { items2 }
        }
      >
        {/* <a onClick={(e) => e.preventDefault()}> */}

        <Space>
          <Avatar
            size="default"
            icon={<UserAddOutlined />}
            src={user.image || ""}
          ></Avatar>
          <span>{user.name || "Người dùng"}</span>
          <DownOutlined />
        </Space>
        {/* </a> */}
      </Dropdown>
    </div>
  );
};

export default User;
