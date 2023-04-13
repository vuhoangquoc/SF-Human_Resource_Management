import React, { useEffect, useState } from "react";
import { Image, Space, Badge, Drawer, List } from "antd";
import { MailOutlined, BellOutlined } from "@ant-design/icons";
import User from "../HomePage/User";
import { getNotification } from "../../api/index";
import "./header.css";


const Header = () => {
  const [notification, setNotification] = useState([]);

  const [hideNotification, setHideNotification] = useState(false);
  const [hideMail, setHideMail] = useState(false);
  useEffect(() => {
    getNotification().then((res) => {
      setNotification(res.comments);
    });
  }, []);
  return (
    <div className="DbHeader">
      <Image
        width={60}
        src="https://www.tmainnovation.com/wp-content/uploads/2020/06/TMA-Innovation-Logo.png"
      ></Image>
      <div className="DbHeader_item">
        <Space style={{ paddingRight: 25 }}>
          <Badge count={20} dot>
            <MailOutlined
              className="notification"
              onClick={() => {
                setHideMail(true);
              }}
            />
          </Badge>
          <Badge count={notification.length}>
            <BellOutlined
              className="notification"
              onClick={() => {
                setHideNotification(true);
              }}
            />
          </Badge>
        </Space>
        {/* <Typography.Title>TMA Solutions</Typography.Title> */}
        {/* <Image
        width={60}
        src="https://www.tmainnovation.com/wp-content/uploads/2020/06/TMA-Innovation-Logo.png"
      ></Image> */}
        <User />
        <Drawer
          title="Thông báo"
          open={hideNotification}
          onClose={() => {
            setHideNotification(false);
          }}
          markClosable
        >
          <List
            dataSource={notification}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Mail"
          open={hideMail}
          onClose={() => {
            setHideMail(false);
          }}
          markClosable
        >
          <List
            dataSource={notification}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
