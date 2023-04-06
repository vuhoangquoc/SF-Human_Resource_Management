import { Space, Table, Typography,Button, Modal, Popconfirm,Input } from "antd";
import { EditOutlined, DeleteOutlined,} from "@ant-design/icons";
import { useState } from "react";
import { PartitiveData } from "../../dummyDate";

const Partitive =() =>{
  const [data,setdata] = useState(PartitiveData);
  const [inputValue, setInputValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentNameInput, setDepartmentName] = useState("");
  const [departmentIdInput, setDepartmentId] = useState("");
 
  const handleAdd =(record,values) =>{
    const newItem = {
      id: data.length + 1,
      departmentId: "DP" + Math.floor(Math.random() * 1000),
      departmentName: inputValue,
      status: "",
    };
    setdata([...data, newItem]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEdit =(record) =>{
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
          departmentName:departmentNameInput,
          departmentId: departmentIdInput,
        };
      } else {
        return item;
      }
    });
    setdata(updatedData);
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

  const handleDelete =(record) =>{
    const newData = data.filter((item) => item.id !== record.id);
    setdata(newData);
  };
  
  
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Partitive</Typography.Title>
      <Space size="middle">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nhập tên bộ phận"
        />
        <Button onClick={handleAdd}>Thêm</Button>
      </Space>
      <Space>
      <Modal
        title="Edit Row"
        visible={modalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        {selectedRow && (
          <>
            <Input
              placeholder="Name"
              value={departmentNameInput}
              onChange={(e) =>  setDepartmentName(e.target.value)}
            />
            <Input
              placeholder="Age"
              value={departmentIdInput}
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </>
        )}
      </Modal>
      </Space>
      <Table 
        columns={[
          {
            title: "STT",
            dataIndex: "id",
            key: "id"
          },
          {
            title: "Mã bộ phận",
            dataIndex: "departmentId",
            key: "departmentId"
          },
          {
            title: "Tên bộ phận",
            dataIndex: "departmentName",
            key: "departmentName"
          },
          {
            title: "Hoạt động",
            dataIndex: "status",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button>
                  <EditOutlined onClick={() => handleEdit(record)}/>
                </Button>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => handleDelete(record)}
                > 
                 <Button> <DeleteOutlined style={{color: "red"}}/></Button>
                </Popconfirm>
              </Space>
            )
          }
        ]}
          dataSource={data}
          pagination={{
            pageSize: 5
          }}
    />
      </Space>
  );
};

 export default Partitive;