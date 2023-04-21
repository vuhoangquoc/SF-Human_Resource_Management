import React, { useEffect, useState }  from 'react'
import {  Space, Table, Input, Button, Popconfirm, Form,Modal  } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PresentData} from "../../dummyDate"
const Present = () => {

  const [data, setData] = useState();
  const [departmentName, setDepartmentName] = useState("");
  const [username, setUsername] = useState("");
  const [format, setFormat] = useState("");
  const [content, setContent] = useState("");
  

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [departmentIdInput, setDepartmentId] = useState("");


// lấy data từ api    
  useEffect(() => {
    const departmentPresentData = JSON.parse (localStorage.getItem("departmentPresentData"));
    if (departmentPresentData && departmentPresentData.length !== 0) {
      setData(departmentPresentData);
    } else {
      setData(PresentData);
      localStorage.setItem("departmentPresentData", JSON.stringify(PresentData));
    }
  }, []);

  //thêm data vào 
  const handleAdd = (record, values) => {
    const newItem = {
      id: data.length + 1,
      username:username,
      departmentId: "SF" + Math.floor(Math.random() * 1000),
      departmentName: departmentName,
      format:format,
      content: content,
      time:new Date().toISOString(),
      status: "",
    };
    setData([...data, newItem]);
    localStorage.setItem("departmentPresentData", JSON.stringify([...data, newItem]));
    setUsername("");
    setDepartmentName("");
    setFormat("");
    setContent("");
  };

  const handleInputUsername = (event) => {
    setUsername(event.target.value); 
  };

  const handleInputDepartmentName = (event) => {
    setDepartmentName(event.target.value);
  };

  const handleInputFormat = (event) => {
    setFormat(event.target.value);
  };

  const handleInputContent = (event) => {
    setContent(event.target.value);
  };
  //thêm data vào
  
  // sửa data
  const handleEdit = (record) => {
    setSelectedRow(record);
    setUsername(record.username);
    setDepartmentName(record.departmentName);
    setDepartmentId(record.departmentId);
    setFormat(record.format);
    setContent(record.content);
    setModalVisible(true);
  };
  const handleSave = () => {
    const updatedData = data.map((item) => {
      if (item.id === selectedRow.id) {
        return {
          ...item,
          username: username,
          departmentName: departmentName,
          departmentId: departmentIdInput,
          format: format,
          content: content,
        };
      } else {
        return item;
      }
    });
    setData(updatedData);
    localStorage.setItem("departmentPresentData", JSON.stringify(updatedData));
    setSelectedRow(null);
    setModalVisible(false);
    setUsername("");
    setDepartmentName("");
    setDepartmentId("");setFormat("");
    setContent("");
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setModalVisible(false);
    setUsername("");;
    setDepartmentName("");
    setDepartmentId("");
    setFormat("");
    setContent("");
  };
  // xóa data
  const handleDelete = (record) => {
    const newData = data.filter((item) => item.id !== record.id);
    setData(newData);
    localStorage.setItem("departmentPresentData", JSON.stringify(newData));
  };

return (
    <div>
      <Space size={20} direction="vertical">
      
      <Space size="middle">
        <Input value={username} onChange={handleInputUsername} placeholder="Họ & Tên"/>
        <Input value={departmentName} onChange={handleInputDepartmentName} placeholder="Nhập tên phòng ban"/>
        <Input value={format} onChange={handleInputFormat} placeholder="Hình thức" />
        <Input value={content} onChange={ handleInputContent} placeholder="Thông tin"/>
      </Space>
      <Button type="primary" onClick={handleAdd}>Thêm</Button>
 
     <Space>
        <Modal title="Sửa" visible={modalVisible} onOk={handleSave} onCancel={handleCancel} >
          {selectedRow && (
            <div>
              <Form>
                <Form.Item>
                  <label htmlFor="">Họ & Tên</label>
                  <Input placeholder="Họ & Tên" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <label htmlFor="">Mã Phòng Ban </label>
                  <Input placeholder="Mã phòng ban" value={departmentIdInput} onChange={(e) => setDepartmentId(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                  <label htmlFor="">Tên Bộ Phận</label>
                  <Input placeholder="Tên bộ phận " value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                  <label htmlFor="">Hình Thức </label>
                  <Input placeholder="Hình thức" value={format} onChange={(e) => setFormat(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <label htmlFor="">Thông Tin  </label>
                  <Input placeholder="Thông tin" value={content} onChange={(e) => setContent(e.target.value)} />
                </Form.Item>
              </Form>
            </div>
          )}
        </Modal>
      </Space>
      <Table 
        columns={[
          // { title: "STT", key:"index", render: (text,record,index)=> index+1},
          { title: "Họ & Tên ", dataIndex: "username", key: "username"},
          { title: "Mã bộ phận", dataIndex: "departmentId",  key: "departmentId"},
          { title: "Tên bộ phận", dataIndex: "departmentName", key: "departmentName"},
          { title: "Hình thức", dataIndex: "format", key: "format" },
          { title: "Thông tin",  dataIndex: "content", key: "content" },
          { title: "thời gian", dataIndex: "time", key: "time"},
          { title: "Hoạt động", dataIndex: "status", key: "action",
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
          pageSize: 5
        }}
        />
        </Space>
    </div>
    )
}

export default Present;