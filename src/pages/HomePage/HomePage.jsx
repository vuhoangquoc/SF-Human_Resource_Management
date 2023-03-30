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
    getThongKe().then((res) => {
      setStaff(res.total);
    });
    getChart().then((res) => {
      setWork(res.total);
      setRest(res.limit);
      setQuit(res.total);
    });
  });

  return (
    <div className="HomePage">
      <Space size={12} direction="vertical">
        {/* <Typography.Title>Home</Typography.Title> */}
        <Space direction="horizontal">
          <HomeCard
            icon={
              <UserOutlined
                style={{
                  backgroundColor: "rgba(138, 43, 226, 0.25)",
                  borderRadius: 12,
                  padding: 8,
                  color: "#66FFFF",
                  fontSize: 24,
                }}
              />
            }
            title={"Nhân viên"}
            value={staff}
          ></HomeCard>
          <HomeCard
            icon={
              <AuditOutlined
                style={{
                  backgroundColor: "rgba(184, 134, 11, 0.25)",
                  borderRadius: 12,
                  padding: 8,
                  color: "#00DD00",
                  fontSize: 24,
                }}
              />
            }
            title={"Đang làm việc"}
            value={work}
          ></HomeCard>
          <HomeCard
            icon={
              <WhatsAppOutlined
                style={{
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 12,
                  padding: 8,
                  color: "#000000",
                  fontSize: 24,
                }}
              />
            }
            title={"Nghỉ phép"}
            value={rest}
          ></HomeCard>
          <HomeCard
            icon={
              <UserDeleteOutlined
                style={{
                  backgroundColor: "rgba(128, 128, 128, 0.25)",
                  borderRadius: 12,
                  padding: 8,
                  color: "#FF3300",
                  fontSize: 24,
                }}
              />
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
