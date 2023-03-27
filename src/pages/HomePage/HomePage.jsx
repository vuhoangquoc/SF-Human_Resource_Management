import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserAddOutlined,
  BorderOuterOutlined,
  FormOutlined,
  GiftOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Pagination, Row, Col, Avatar } from "antd";
import React, { useState } from "react";
import "./HomePage.css";
const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <UserAddOutlined />,
              label: "Personel Records",
            },
            {
              key: "3",
              icon: <BorderOuterOutlined />,
              label: "Department",
            },
            {
              key: "4",
              icon: <FormOutlined />,
              label: "Position",
            },
            {
              key: "5",
              icon: <GiftOutlined />,
              label: "Reward and discipline",
            },
            {
              key: "6",
              icon: <ContactsOutlined />,
              label: "Contact Information",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 30,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col span={18}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </Col>
            <Col span={6}>
              <div classname="col-user">
                <div className="col-user-item">
                  <Avatar size="default" icon={<UserAddOutlined />}></Avatar>
                  <span>Vũ Hoàng</span>
                </div>
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
        {/* <Pagination
          defaultCurrent={1}
          total={50}
          className="pagination-layout"
        /> */}
        ;
      </Layout>
    </Layout>
  );
};

export default HomePage;
