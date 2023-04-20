import { Space, Table, Button, Modal, Popconfirm, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PartitiveData } from "../../dummyDate";

const Partitive = () => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentNameInput, setDepartmentName] = useState("");
  const [departmentIdInput, setDepartmentId] = useState("");

  useEffect(() => {
    const departmentData = localStorage.getItem("departmentData");
    if (departmentData && departmentData.length !== 0) {
      setData(JSON.parse(departmentData));
    } else {
      setData(PartitiveData);
      localStorage.setItem("departmentData", JSON.stringify(PartitiveData));
    }
  }, []);

  const handleAdd = (record, values) => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newItem = {
      id: randomNumber,
      departmentId: "SF" + Math.floor(Math.random() * 1000),
      departmentName: inputValue,
      status: "",
    };
    setData(() => {
      return [...data, newItem];
    });
    localStorage.setItem("departmentData", JSON.stringify([...data, newItem]));
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEdit = (record) => {
    setSelectedRow(record);
    setDepartmentName(record.departmentName);
    setDepartmentId(record.departmentId);
    setModalVisible(true);
  };

  const handleSave = () => {
    const updatedData = data.map((item) => {
      if (item.id === selectedRow.id) {
        return {
          ...item,
          departmentName: departmentNameInput,
          departmentId: departmentIdInput,
        };
      } else {
        return item;
      }
    });
    setData(updatedData);
    localStorage.setItem("departmentData", JSON.stringify(updatedData));
    setSelectedRow(null);
    setModalVisible(false);
    setDepartmentName("");
    setDepartmentId("");
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setModalVisible(false);
    setDepartmentName("");
    setDepartmentId("");
  };

  const handleDelete = (record) => {
    const newData = data.filter((item) => item.id !== record.id);
    setData(newData);
    localStorage.setItem("departmentData", JSON.stringify(newData));
  };

  return (
    <Space size={20} direction="vertical">
      <Space size="middle">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nhập tên phòng ban"
        />
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </Space>

      <Space>
        <Modal
          title="Sửa"
          visible={modalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
        >
          {selectedRow && (
            <>
              <Form>
                <Form.Item>
                  <label htmlFor="">Tên phòng ban</label>
                  <Input
                    placeholder="PB"
                    value={departmentNameInput}
                    onChange={(e) => setDepartmentName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <label htmlFor="">Mã phòng ban</label>
                  <Input
                    placeholder="MPB"
                    value={departmentIdInput}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
      </Space>

      <Table
        columns={[
          // {
          //   title: "STT",
          //   key: "id",
          //   render: (text, record, index) => index + 1,
          // },
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
  );
};

export default Partitive;
