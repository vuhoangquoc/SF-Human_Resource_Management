import React, { useEffect, useLayoutEffect, useState } from "react";
import { getSingleUser } from "../../api";
import { Avatar, Card, Col, Divider, Layout, Row } from "antd";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  let { userId } = useParams();

  useLayoutEffect(() => {
    let localData = localStorage.getItem("usersData");
    if (localData && localData.length !== 0) {
      localData = JSON.parse(localData);
      let profileUser = localData.find((u) => String(u.id) === userId);

      setDataSource(profileUser);
      setLoading(false);
    } else
      (async function fetchdata() {
        setLoading(true);
        let res = await getSingleUser(userId);

        setDataSource(res);
        setLoading(false);
        console.log(res);
      })();
  }, [userId]);
  return (
    <div>
      {dataSource && (
        <Layout>
          <Header style={{ background: "#fff", padding: 0 - 0 - 0 - 8 }}>
            <h1>Thông tin nhân sự</h1>
          </Header>
          <Content style={{ padding: "24px" }}>
            <Row>
              <Col span={10} style={{ width: 100 }}>
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  src={dataSource.image}
                />
              </Col>
              <Col span={14} style={{ width: 250 }}>
                <h2>
                  {dataSource.lastName} {dataSource.firstName}
                </h2>
                <p>{dataSource.email}</p>
                <p>{dataSource.phone}</p>
              </Col>
            </Row>
            <Divider />
            <Card>
              <p>
                <i>Tuổi: </i>
                <b>{dataSource.age}</b>
              </p>
            </Card>
            <Card>
              <p>
                <i>Giới tính: </i>
                <b>{dataSource.gender}</b>
              </p>
            </Card>
            <Card>
              <p>
                <i>Phòng ban: </i>
                <b>{dataSource.company?.department}</b>
              </p>
            </Card>
            <Card>
              <p>
                <i>Ngày sinh: </i>
                <b>{dataSource.birthDate}</b>
              </p>
            </Card>
          </Content>
        </Layout>
      )}
    </div>
  );
};

export default UserProfile;
