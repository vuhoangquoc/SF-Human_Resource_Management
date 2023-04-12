import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table } from "antd";
import {
  UserOutlined,
  AuditOutlined,
  UserDeleteOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { getChart, getInf, getThongKe } from "../../api";

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
  const [quit, setQuit] = useState(0);

  useEffect(() => {
    const localData = localStorage.getItem("usersData");
    if (localData && localData.length !== 0) {
      console.log(JSON.parse(localData));
      setStaff(JSON.parse(localData).length);
    }
  });
  useEffect(() => {
    // getThongKe().then((res) => {
    //   setStaff(res.users.length); // đãy lấy được số lượng user
    // });
    getChart().then((res) => {
      setWork(res.total);
      setRest(res.limit);
      // setQuit(res.total);
    });
  });

  return (
    <div className="HomePage">
      <Space size={12} direction="vertical">
        {/* <Typography.Title>Home</Typography.Title> */}
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
              <WhatsAppOutlined className="icon-all icon-WhatsAppOutlined" />
            }
            title={"Nghỉ phép"}
            value={rest}
          ></HomeCard>
          <HomeCard
            icon={
              <UserDeleteOutlined className="icon-all icon-UserDeleteOutlined" />
            }
            title={"Đã nghỉ việc"}
            value={quit}
          ></HomeCard>
        </Space>
        <Space>
          <Inf />
          <Chart />
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
    getInf().then((res) => {
      setDataSource(res.users.splice(0, 3));
      setLoading(false);
    });
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
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
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
