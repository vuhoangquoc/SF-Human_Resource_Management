import React from "react";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate();
  const user = {
    // name: "Vũ Hoàng",
    // image: "https://avatars.githubusercontent.com/u/103670048?v=4",
  };
  const items2 = [
    // {
    //   key: "1",
    //   label: <Link to="/">Thông tin</Link>,
    // },
    {
      key: "1",
      label: (
        <Link to="/">
          <div>Đăng xuất</div>
          {/* onClick={handleLogOut} */}
        </Link>
      ),
    },
  ];

  const items =
    Object.keys(user).length === 0
      ? [
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
          {
            key: "3",
            label: (
              <Link to="/Password">
                <div>Đổi mật Khẩu</div>
              </Link>
            ),
          },
          {
            key: "4",
            label: (
              <Button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  navigate("/signin");
                }}
              >
                Đăng xuất
              </Button>
            ),
          },
        ]
      : items2;

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown menu={{ items }}>
        <Space>
          <Avatar
            size="default"
            icon={<UserAddOutlined />}
            // src={user.image || ""}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8t4tE4MIKosJILqAvmB-hg3ognAutIw01UQ&usqp=CAU"
          ></Avatar>
          <span>{user.name || "Admin"}</span>
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default User;
