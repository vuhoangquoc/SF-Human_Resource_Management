import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button, Form, Modal, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PositionData } from "../../dummyDate";
const Position = () => {
  const [data, setData] = useState();

  const [departmentName, setDepartmentName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentIdInput, setDepartmentId] = useState("");

  // lấy data từ api
  useEffect(() => {
    const departmentPostitionData = JSON.parse(
      localStorage.getItem("departmentPostitionData")
    );
    if (departmentPostitionData && departmentPostitionData.length !== 0) {
      setData(departmentPostitionData);
    } else {
      setData(PositionData);
      localStorage.setItem(
        "departmentPostitionData",
        JSON.stringify(PositionData)
      );
    }
  }, []);
  const handleAdd = (record, values) => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newItem = {
      id: randomNumber,
      username: username,
      gender: gender,
      age: age,
      departmentId: "SF" + Math.floor(Math.random() * 1000),
      departmentName: departmentName,
      position: position,
      status: "",
    };
    setData([...data, newItem]);
    localStorage.setItem(
      "departmentPostitionData",
      JSON.stringify([...data, newItem])
    );
    setUsername("");
    setGender("");
    setAge("");
    setDepartmentName("");
    setPosition("");
  };

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleInputGender = (event) => {
    setGender(event.target.value);
  };

  const handleInputAge = (event) => {
    setAge(event.target.value);
  };

  const handleInputDepartmentName = (event) => {
    setDepartmentName(event.target.value);
  };

  const handleInputPosition = (event) => {
    setPosition(event.target.value);
  };
  //thêm data vào

  // sửa data
  const handleEdit = (record) => {
    setSelectedRow(record);
    setUsername(record.username);
    setGender(record.gender);
    setAge(record.age);
    setDepartmentName(record.departmentName);
    setDepartmentId(record.departmentId);
    setPosition(record.position);
    setModalVisible(true);
  };
  const handleSave = () => {
    const updatedData = data.map((item) => {
      if (item.id === selectedRow.id) {
        return {
          ...item,
          username: username,
          gender: gender,
          age: age,
          departmentName: departmentName,
          departmentId: departmentIdInput,
          position: position,
        };
      } else {
        return item;
      }
    });
    setData(updatedData);
    localStorage.setItem(
      "departmentPostitionData",
      JSON.stringify(updatedData)
    );
    setSelectedRow(null);
    setModalVisible(false);
    setUsername("");
    setGender("");
    setAge("");
    setDepartmentName("");
    setDepartmentId("");
    setPosition("");
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setModalVisible(false);
    setUsername("");
    setGender("");
    setAge("");
    setDepartmentName("");
    setDepartmentId("");
    setPosition("");
  };
  // xóa data
  const handleDelete = (record) => {
    const newData = data.filter((item) => item.id !== record.id);
    setData(newData);
    localStorage.setItem("departmentPostitionData", JSON.stringify(newData));
  };
  return (
    <div>
      <Space size={20} direction="vertical">
        {/* thêm */}
        <Space size="middle">
          <Input
            value={username}
            onChange={handleInputUsername}
            placeholder="Họ tên"
          />
          <Input
            value={gender}
            onChange={handleInputGender}
            placeholder="Giới tính"
          />
          <Input value={age} onChange={handleInputAge} placeholder="Tuổi" />
          <Input
            value={departmentName}
            onChange={handleInputDepartmentName}
            placeholder="Tên phòng ban"
          />
          <Input
            value={position}
            onChange={handleInputPosition}
            placeholder="Chức vụ"
          />
        </Space>
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>

        {/* sửa */}
        <Space>
          <Modal
            title="Sửa"
            visible={modalVisible}
            onOk={handleSave}
            onCancel={handleCancel}
          >
            {selectedRow && (
              <div>
                <Form>
                  <Form.Item>
                    <label htmlFor="">Họ tên</label>
                    <Input
                      placeholder="Họ tên"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="">Giới tính</label>
                    <Input
                      placeholder="Giới tính"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="">Tuổi</label>
                    <Input
                      placeholder="Tuổi"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="">Mã phòng ban</label>
                    <Input
                      placeholder="Mã phòng ban"
                      value={departmentIdInput}
                      onChange={(e) => setDepartmentId(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="">Tên phòng ban</label>
                    <Input
                      placeholder="Tên bộ phận "
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="">Chức vụ</label>
                    <Input
                      placeholder="Chức vụ"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </div>
            )}
          </Modal>
        </Space>

        <Table
          columns={[
            // {
            //   title: "STT",
            //   key: "index",
            //   render: (text, record, index) => index + 1,
            // },
            { title: "Họ tên", dataIndex: "username", key: "username" },
            { title: "Giới tính", dataIndex: "gender", key: "gender" },
            { title: "Tuổi", dataIndex: "age", key: "age" },
            {
              title: "Mã phòng ban",
              dataIndex: "departmentId",
              key: "departmentId",
            },
            {
              title: "Tên phòng ban",
              dataIndex: "departmentName",
              key: "departmentName",
            },
            { title: "Chức vụ", dataIndex: "position", key: "postion" },
            {
              title: "Thao tác",
              dataIndex: "status",
              key: "action",
              render: (text, record) => (
                <Space size="middle">
                  <Button>
                    <EditOutlined onClick={() => handleEdit(record)} />
                  </Button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => handleDelete(record)}
                  >
                    <Button>
                      <DeleteOutlined style={{ color: "red" }} />
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={data}
          pagination={{
            pageSize: 5,
          }}
        />
      </Space>
    </div>
  );
};

export default Position;
