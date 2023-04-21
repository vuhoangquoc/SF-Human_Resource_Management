import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  BorderOuterOutlined,
  FormOutlined,
  GiftOutlined,
  ContactsOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="DbSidebar">
      <Menu
        className="DbSidebarMenu"
        mode="vertical"
        onClick={(item) => {
          // item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            key: "/home",
            icon: <HomeOutlined />,
            label: "Trang chủ",
          },
          {
            key: "/personel",
            icon: <UserAddOutlined />,
            label: "Nhân sự",
          },
          {
            key: "/department",
            icon: <BorderOuterOutlined />,
            label: "Phòng ban",
          },
          {
            key: "/createuser",
            icon: <UsergroupAddOutlined />,
            label: "Người dùng",
          },
          {
            key: "/position",
            icon: <FormOutlined />,
            label: "Chức vụ",
          },
          {
            key: "/present",
            icon: <GiftOutlined />,
            label: "Khen thưởng và kỉ luật",
          },
          {
            key: "/contract",
            icon: <ContactsOutlined />,
            label: "Thông tin hợp đồng",
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;
