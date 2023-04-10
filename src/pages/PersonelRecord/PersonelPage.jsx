import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Table,
  Modal,
  Input,
  Space,
  Switch,
  Radio,
  Form,
  Select,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { delUser, getUser } from "../../api/index";
import { useNavigate } from "react-router-dom";

const PersonelPage = () => {
  const navigate = useNavigate();
  // State lấy user từ api
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // State edit nhân sự
  const [isEdit, setIsEdit] = useState(false);
  const [editStaff, setEditStaff] = useState(null);

  // State thêm nhân sự
  const [addLastName, setAddLastName] = useState();
  const [addFirstName, setAddFirstName] = useState();
  const [addAge, setAddAge] = useState();
  const [addGender, setAddGender] = useState();
  const [addEmail, setAddEmail] = useState();
  const [addPhone, setAddPhone] = useState();
  const [addCompany, setAddCompany] = useState();
  const [addBirthDate, setAddBirthDate] = useState();

  useEffect(() => {
    setLoading(true);
    //TODO: get user data from local storage
    const localData = localStorage.getItem("usersData");
    //If have data in local => set datasource state = local data
    if (localData && localData.length !== 0) {
      setDataSource(JSON.parse(localData));
      setLoading(false);
    } // else => fetch data from API án set it to local storage
    else
      getUser().then((res) => {
        setDataSource(res.users);
        localStorage.setItem("usersData", JSON.stringify(res.users));
        setLoading(false);
      });
  }, []);

  // Function thêm nhân sự
  const handleLastNameChange = (e) => {
    setAddLastName(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setAddFirstName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAddAge(e.target.value);
  };

  const handleEmailChange = (e) => {
    setAddEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setAddPhone(e.target.value);
  };
  // End

  // Button chế độ nghỉ phép
  const ToggleSwitch = ({ checked }) => {
    const onChange = (checked) => {
      console.log(`switch to ${checked}`);
    };
    return (
      <Switch
        checked={checked}
        onChange={onChange}
        checkedChildren="Nghỉ phép"
        unCheckedChildren="Đang làm"
      />
    );
  };
  // End button

  const columns = [
    // {
    //   title: "Ảnh",
    //   dataIndex: "image",
    //   render: (link) => {
    //     return <Avatar src={link} />;
    //   },
    // },
    {
      title: "Họ",
      dataIndex: "lastName",
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập tên nhân sự..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.firstName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tuổi",
      dataIndex: "age",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "SDT",
    //   dataIndex: "phone",
    // },
    {
      title: "Phòng ban",
      dataIndex: "company",
      render: (item) => item.department,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
    },
    {
      title: "Thao tác",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                handleEdit(record);
              }}
            />
            <EyeOutlined
              onClick={() => {
                console.log(record.id);
                navigate(`/profile/${record.id}`);
              }}
              style={{ marginLeft: 12, marginRight: 12 }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDeleteStaff(record);
                setLoading(true);
                delUser(record.id);
                console.log(record);
              }}
              style={{ color: "red" }}
            />
          </>
        );
      },
    },
    {
      title: "Hoạt động",
      render: (record) => {
        return (
          <>
            <ToggleSwitch />
          </>
        );
      },
    },
  ];

  // Thêm nhân sự
  const addStaff = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStaff = {
      id: randomNumber,
      // image: <Avatar size="default" icon={<UserAddOutlined />}></Avatar>,
      lastName: addLastName,
      firstName: addFirstName,
      age: addAge,
      gender: addGender,
      email: addEmail,
      phone: addPhone,
      company: { department: addCompany },
      birthDate: addBirthDate,
    };

    setDataSource(() => {
      return [...dataSource, newStaff];
    });
    localStorage.setItem(
      "usersData",
      JSON.stringify([...dataSource, newStaff])
    );
  };
  // End thêm nhân sự

  // Del nhân sự
  const handleDeleteStaff = (record) => {
    Modal.confirm({
      title: "Bạn có muốn xóa nhân sự không?",
      okText: "Xóa",
      okType: "primary",
      onOk: () => {
        setLoading(false);
        setDataSource((oldData) => {
          let deletedUser = oldData.filter((staff) => staff.id !== record.id);
          localStorage.setItem("usersData", JSON.stringify(deletedUser));

          return deletedUser;
        });
      },
      cancelText: "Đóng",
      onCancel: () => {
        setLoading(false);
      },
    });
  };
  // End del nhân sự

  // Edit nhân sự
  const handleEdit = (record) => {
    setIsEdit(true);
    setEditStaff({ ...record });
  };

  const resetEdit = () => {
    setIsEdit(false);
    setEditStaff(null);
  };
  // End edit nhân sự

  // Modal Thêm nhân sự
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    addStaff();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  // End Model thêm nhân sự

  return (
    <div>
      <Space size={20} direction="vertical">
        <Button type="primary" onClick={showModal}>
          Thêm
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 7 }}
        ></Table>
      </Space>

      {/* Modal Thêm nhân sự */}
      <Modal
        title="Thêm"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Họ">
            <Input
              value={addLastName}
              onChange={handleLastNameChange}
              placeholder="Họ"
            />
          </Form.Item>
          <Form.Item label="Tên">
            <Input
              value={addFirstName}
              onChange={handleFirstNameChange}
              placeholder="Tên"
            />
          </Form.Item>
          <Form.Item label="Tuổi">
            <Input
              type="number"
              value={addAge}
              onChange={handleAgeChange}
              placeholder="Tuổi"
            />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group
              onChange={(e) => {
                setAddGender(e.target.value);
              }}
              value={addGender}
            >
              <Radio value={"Nam"}>Nam</Radio>
              <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            value={addEmail}
            onChange={handleEmailChange}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="SDT">
            <Input
              type="number"
              value={addPhone}
              onChange={handlePhoneChange}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item label="Phòng ban">
            <Space wrap>
              <Select
                defaultValue="IT"
                style={{
                  width: 120,
                }}
                onChange={(value) => {
                  setAddCompany(value);
                }}
                options={[
                  {
                    value: "IT",
                    label: "IT",
                  },
                  {
                    value: "Support",
                    label: "Support",
                  },
                  {
                    value: "Services",
                    label: "Services",
                  },
                  {
                    value: "Marketing",
                    label: "Marketing",
                  },
                ]}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <Space direction="vertical">
              <DatePicker
                onChange={(date, dateString) => {
                  setAddBirthDate(dateString);
                }}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* End Modal thêm nhân sự */}

      {/* Modal Sửa nhân sự */}
      <Modal
        title="Sửa"
        visible={isEdit}
        onText="Save"
        onCancel={() => {
          resetEdit();
        }}
        onOk={() => {
          setDataSource((pre) => {
            let newData = pre.map((staff) => {
              if (staff.id === editStaff.id) {
                return editStaff;
              } else return staff;
            });
            localStorage.setItem("usersData", JSON.stringify(newData));
            return newData;
          });
          resetEdit();
        }}
      >
        {/* <span style={{ fontWeight: "bold" }}>Ảnh</span>
        <Input value={editStaff?.image} /> */}
        <Form>
          <Form.Item label="Họ">
            <Input
              value={editStaff?.lastName}
              onChange={(e) => {
                setEditStaff((pre) => {
                  return { ...pre, lastName: e.target.value };
                });
              }}
              placeholder="Họ"
            />
          </Form.Item>
        </Form>
        <Form.Item label="Tên">
          <Input
            value={editStaff?.firstName}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
            placeholder="Tên"
          />
        </Form.Item>
        <Form.Item label="Tuổi">
          <Input
            type="number"
            value={editStaff?.age}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, age: e.target.value };
              });
            }}
            placeholder="Tuổi"
          />
        </Form.Item>
        <Form.Item label="Giới tính">
          <Radio.Group
            value={editStaff?.gender}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, gender: e.target.value };
              });
            }}
          >
            <Radio value={"Nam"}>Nam</Radio>
            <Radio value={"Nữ"}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={editStaff?.email}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item label="SDT">
          <Input
            type="number"
            value={editStaff?.phone}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, phone: e.target.value };
              });
            }}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item label="Phòng ban">
          <Space wrap>
            <Select
              defaultValue="IT"
              style={{
                width: 120,
              }}
              value={editStaff?.company.department}
              onChange={(value) => {
                setEditStaff((pre) => {
                  return { ...pre, company: { department: value } };
                });
              }}
              options={[
                {
                  value: "IT",
                  label: "IT",
                },
                {
                  value: "Support",
                  label: "Support",
                },
                {
                  value: "Services",
                  label: "Services",
                },
                {
                  value: "Marketing",
                  label: "Marketing",
                },
              ]}
            />
          </Space>
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <Space direction="vertical">
            <DatePicker
              defaultValue={dayjs(editStaff?.birthDate, "YYYY-MM-DD")}
              onChange={(date, dateString) => {
                setEditStaff((pre) => {
                  return { ...pre, birthDate: dateString };
                });
              }}
            />
          </Space>
        </Form.Item>
      </Modal>
      {/* End Modal sửa nhân sự */}
    </div>
  );
};

export default PersonelPage;
