import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button, Form, Modal, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ContractData } from "../../dummyDate";
const Contract = () => {
  const [data, setData] = useState();
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // lấy data từ api
  useEffect(() => {
    const departmentContractData = JSON.parse(
      localStorage.getItem("departmentContractData")
    );
    if (departmentContractData && departmentContractData.length !== 0) {
      setData(departmentContractData);
    } else {
      setData(ContractData);
      localStorage.setItem(
        "departmentContractData",
        JSON.stringify(ContractData)
      );
    }
  }, []);
  const handleAdd = (record, values) => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newItem = {
      id: randomNumber,
      contractNumber: "HD -" + Math.floor(Math.random() * 50),
      customerName: customerName,
      customerId: "KH -" + Math.floor(Math.random() * 50),
      product: product,
      totalAmount: totalAmount,
      contractDate: new Date().toISOString(),
      status: "",
    };
    setData([...data, newItem]);
    localStorage.setItem(
      "departmentContractData",
      JSON.stringify([...data, newItem])
    );
    setCustomerName("");
    setProduct("");
    setTotalAmount("");
  };

  const handleInputCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  const handleInputProduct = (event) => {
    setProduct(event.target.value);
  };

  const handleInputTotalAmount = (event) => {
    setTotalAmount(event.target.value);
  };
  //thêm data vào

  // sửa data
  const handleEdit = (record) => {
    setSelectedRow(record);
    setCustomerName(record.customerName);
    setProduct(record.product);
    setTotalAmount(record.totalAmount);
    setModalVisible(true);
  };
  const handleSave = () => {
    const updatedData = data.map((item) => {
      if (item.id === selectedRow.id) {
        return {
          ...item,
          customerName: customerName,
          product: product,
          totalAmount: totalAmount,
        };
      } else {
        return item;
      }
    });
    setData(updatedData);
    localStorage.setItem("departmentContractData", JSON.stringify(updatedData));
    setSelectedRow(null);
    setCustomerName("");
    setProduct("");
    setTotalAmount("");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedRow(null);
    setModalVisible(false);
    setCustomerName("");
    setProduct("");
    setTotalAmount("");
  };
  // xóa data
  const handleDelete = (record) => {
    const newData = data.filter((item) => item.id !== record.id);
    setData(newData);
    localStorage.setItem("departmentContractData", JSON.stringify(newData));
  };
  return (
    <div>
      <Space size={20} direction="vertical">
        <Space size="middle">
          <Input
            value={customerName}
            onChange={handleInputCustomerName}
            placeholder="Họ tên"
          />
          {/* <Input
            value={product}
            onChange={handleInputProduct}
            placeholder="Sản phẩm "
          /> */}
          <Input
            value={totalAmount}
            onChange={handleInputTotalAmount}
            placeholder="Tiền lương"
          />
        </Space>
        <Button type="primary" onClick={handleAdd}>
          Thêm
        </Button>

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
                      placeholder="Họ & Tên"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </Form.Item>
                  {/* <Form.Item>
                    <label htmlFor="">Sản phẩm </label>
                    <Input
                      placeholder="Sản phẩm"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </Form.Item> */}
                  <Form.Item>
                    <label htmlFor="">Giá trị</label>
                    <Input
                      placeholder="Giá trị"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
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
            {
              title: "Mã hợp đồng ",
              dataIndex: "contractNumber",
              key: "contractNumber",
            },
            {
              title: "Họ tên ",
              dataIndex: "customerName",
              key: "customerName",
            },
            // {
            //   title: "Mã khách hàng ",
            //   dataIndex: "customerId",
            //   key: "customerId",
            // },
            // { title: "Sản phẩm ", dataIndex: "product", key: "product" },
            {
              title: "Tiền lương",
              dataIndex: "totalAmount",
              key: "totalAmount",
            },
            { title: "Ngày ", dataIndex: "contractDate", key: "contractDate" },
            {
              title: "Hoạt động",
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

export default Contract;
