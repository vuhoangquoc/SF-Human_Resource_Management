import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table } from "antd";
import {
  UserOutlined,
  AuditOutlined,
  BorderOuterOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { getChart } from "../../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./HomePage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const [staff, setStaff] = useState(0);
  const [work, setWork] = useState(0);
  const [rest, setRest] = useState(0);
  const [department, setDepartment] = useState(0);

  useEffect(() => {
    // lấy số lượng Staff: nhân sự
    const localData = localStorage.getItem("usersData");
    if (localData && localData.length !== 0) {
      // console.log("Vũ ơi", JSON.parse(localData));
      setStaff(JSON.parse(localData).length);
    }

    // lấy số lượng đang nghỉ phép
    const getDataRest = localStorage.getItem("vacationMode");
    if (JSON.parse(getDataRest) !== null) {
      const condition = (value) => value !== false;
      const filteredVacation = Object.entries(JSON.parse(getDataRest))
        .filter(([key, value]) => condition(value))
        .reduce((data, [key, value]) => {
          data[key] = value;
          return data;
        }, {});
      // console.log(filteredVacation);
      if (getDataRest && getDataRest.length !== 0) {
        // console.log("rest nè vũ", JSON.parse(getDataRest));
        // setRest(Object.keys(JSON.parse(getDataRest)).length);
        setRest(Object.keys(filteredVacation).length);
        // console.log("Cái chi", Object.keys(JSON.parse(getDataRest)).length);
      }
    } else setRest(0);

    // lấy số lượng đang làm việc
    if (staff < rest) {
      // setWork(staff);
      // localStorage.removeItem("vacationMode");
      // window.location.reload();
    } else setWork(staff - rest);

    const getDepartmentData = localStorage.getItem("departmentData");
    if (getDepartmentData && getDepartmentData.length !== 0) {
      // console.log("Vũ ơi", JSON.parse(localData));
      setDepartment(JSON.parse(getDepartmentData).length);
    } else setDepartment(0);
  }, [staff, rest]);

  return (
    <div className="HomePage">
      <Space size={12} direction="vertical">
        {/* <Typography.Title>Trang chủ</Typography.Title> */}
        <Space direction="horizontal">
          <HomeCard
            icon={<UserOutlined className="icon-all icon-UserOutlined" />}
            title={"Nhân viên"}
            value={staff}
          ></HomeCard>
          <HomeCard
            icon={<AuditOutlined className="icon-all icon-AuditOutlined" />}
            title={"Đang làm việc"}
            value={work}
          ></HomeCard>
          <HomeCard
            icon={
              <UsergroupDeleteOutlined className="icon-all icon-WhatsAppOutlined" />
            }
            title={"Nghỉ phép"}
            value={rest}
          ></HomeCard>
          <HomeCard
            icon={
              <BorderOuterOutlined className="icon-all icon-UserDeleteOutlined" />
            }
            title={"Phòng ban"}
            value={department}
          ></HomeCard>
        </Space>
        <Space>
          {/* <Inf /> */}
          {/* <Chart /> */}
        </Space>
      </Space>
    </div>
  );
};

function HomeCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function Inf() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // getInf().then((res) => {
    //   setDataSource(res.users.splice(0, 3));
    //   setLoading(false);
    // });
    const localData = localStorage.getItem("usersData");
    setDataSource(JSON.parse(localData).splice(0, 3));
    setLoading(false);
  }, []);

  return (
    <Table
      columns={[
        { title: "Họ", dataIndex: "lastName" },
        { title: "Tên", dataIndex: "firstName" },
        { title: "Tuổi", dataIndex: "age" },
        { title: "Giới tính", dataIndex: "gender" },
        { title: "Email", dataIndex: "email" },
        { title: "SDT", dataIndex: "phone" },
      ]}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    ></Table>
  );
}

function Chart() {
  const [reve, setReve] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getChart().then((res) => {
      const labels = res.carts.map((cart) => {
        return cart.userId;
      });
      const data = res.carts.map((cart) => {
        return cart.totalQuantity;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: "rgba(153, 50, 204, 0.5)",
          },
        ],
      };
      setReve(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Thống kê",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reve} />
    </Card>
  );
}
export default HomePage;
