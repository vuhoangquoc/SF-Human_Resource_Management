import React, { useEffect, useLayoutEffect, useState } from "react";
import { getSingleUser } from "../../api";
import { Avatar, Card } from "antd";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
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
      <Card>
        <Card>
          <Avatar icon={<UserOutlined />} />
        </Card>
        {dataSource && (
          <Card>
            <span>{dataSource.lastName}</span>
            <span>{dataSource.firstName}</span>
            <span>{dataSource.age}</span>
            <span>{dataSource.email}</span>
            <span>{dataSource.phone}</span>
            <span>{dataSource.company?.department}</span>
            <span>{dataSource.birthDate}</span>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default UserProfile;
