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
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getUser } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUser,
  toggleVacationMode2,
} from "../../Redux/Reducer/onSwitchSlice";

const PersonelPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State lấy user từ api
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // State edit nhân sự
  const [isEdit, setIsEdit] = useState(false);
  const [editStaff, setEditStaff] = useState(null);

  // State thêm nhân sự
  const [addImage, setAddImage] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addFirstName, setAddFirstName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [addGender, setAddGender] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addCompany, setAddCompany] = useState("");
  const [addBirthDate, setAddBirthDate] = useState("");

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
  const handleImageChange = (e) => {
    setAddImage(e.target.value);
  };
  // End

  // Switch chế độ nghỉ phép
  const VacationModeToggle = ({ id }) => {
    const dispatch = useDispatch();

    // onSwitch
    const isVacationModeOn2 = useSelector(
      (state) => state.vacationMode2[id] ?? false
    );

    // useEffect(() => {
    //   localStorage.setItem(
    //     `vacationMode_${id}`,
    //     JSON.stringify(isVacationModeOn2)
    //   );
    // }, [id, isVacationModeOn2]);

    // onSwitch
    const handleToggle2 = (checked) => {
      dispatch(toggleVacationMode2({ id, checked }));
    };

    return (
      <div>
        {/* <label htmlFor={`vacationModeToggle_${id}`}>Vacation Mode:</label> */}
        <Switch
          id={`vacationModeToggle_${id}`}
          checked={isVacationModeOn2}
          onChange={handleToggle2}
          checkedChildren="Nghỉ phép"
          unCheckedChildren="Đang làm"
        />
      </div>
    );
  };
  // End Switch

  // Xử lý bug khi xóa nhân sự đang bật chế độ nghỉ phép
  // const handleBugStaff = (id) => {
  //   const getDataRest = localStorage.getItem("vacationMode");
  //   if (getDataRest) {
  //     const filteredObject = Object.fromEntries(
  //       // Sử dụng filter để lọc qua mảng các cặp key-value
  //       Object.entries(JSON.parse(getDataRest)).filter(([id, value]) => {
  //         // Chỉ giữ lại các cặp key-value với value là false
  //         return value === false;
  //       })
  //     );
  //     console.log(filteredObject);
  //     // localStorage.setItem("vacationMode", JSON.stringify(filteredObject));
  //   }
  // };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (link) => {
        return <Avatar src={link} />;
      },
    },
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Nhập phòng ban..."
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
        return record.company.department
          .toLowerCase()
          .includes(value.toLowerCase());
      },
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
                // let va = JSON.parse(localStorage.getItem("vacationMode"));
                // console.log(typeof va);
                // Reflect.deleteProperty(va, record.id);

                // console.log(va);
                // localStorage.setItem("vacationMode", JSON.stringify(va));
                // dispatch(deleteUser(record.id));
                handleDeleteStaff(record);
                // handleBugStaff(record.id);
                setLoading(true);
                // delUser(record.id);
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
            <VacationModeToggle id={record.id} />
          </>
        );
      },
    },
  ];

  // Thêm nhân sự
  const addStaff = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStaff = {
      // id: dataSource.length + 1,
      id: randomNumber,
      image: addImage,
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
    setAddImage("");
    setAddLastName("");
    setAddFirstName("");
    setAddAge("");
    setAddGender("");
    setAddEmail("");
    setAddPhone("");
    setAddCompany("");
    setAddBirthDate("");
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
        // dispatch(deleteUser(record));
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

  const [options, setOptions] = useState([]); // State để lưu các tùy chọn của thẻ Select

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const getDepartmentData = localStorage.getItem("departmentData"); // Thay 'key' bằng key của dữ liệu trong localStorage của bạn
    const parsedData = JSON.parse(getDepartmentData); // Chuyển đổi dữ liệu từ chuỗi sang đối tượng
    console.log(parsedData);
    // Cập nhật state với các tùy chọn đã lọc
    setOptions(
      parsedData.map((item) => ({
        value: item.departmentName,
        label: item.departmentName,
      }))
    );
  }, []); // Chạy useEffect một lần duy nhất khi component được mount

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
          pagination={{ pageSize: 6 }}
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
          <Form.Item>
            <label htmlFor="">Ảnh</label>
            <Input
              value={addImage}
              onChange={handleImageChange}
              placeholder="Ảnh"
            />
          </Form.Item>
          <Form.Item>
            <label htmlFor="">Họ:</label>
            <Input
              value={addLastName}
              onChange={handleLastNameChange}
              placeholder="Họ"
            />
          </Form.Item>
          <Form.Item>
            <label htmlFor="">Tên:</label>
            <Input
              value={addFirstName}
              onChange={handleFirstNameChange}
              placeholder="Tên"
            />
          </Form.Item>
          <Form.Item>
            <label htmlFor="">Tuổi:</label>
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
            <label htmlFor="">Email:</label>
            <Input />
          </Form.Item>
          <Form.Item>
            <label htmlFor="">SDT:</label>
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
                // defaultValue="IT"
                style={{
                  width: 120,
                }}
                value={addCompany}
                onChange={(value) => {
                  setAddCompany(value);
                }}
                options={options}
                // options={[
                //   {
                //     value: "IT",
                //     label: "IT",
                //   },
                //   {
                //     value: "Support",
                //     label: "Support",
                //   },
                //   {
                //     value: "Services",
                //     label: "Services",
                //   },
                //   {
                //     value: "Marketing",
                //     label: "Marketing",
                //   },
                // ]}
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
          <Form.Item>
            <label htmlFor="">Ảnh</label>
            <Input
              value={editStaff?.image}
              onChange={(e) => {
                setEditStaff((pre) => {
                  return { ...pre, image: e.target.value };
                });
              }}
              placeholder="Ảnh"
            />
          </Form.Item>
          <Form.Item>
            <label htmlFor="">Họ:</label>
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
        <Form.Item>
          <label htmlFor="">Tên:</label>
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
        <Form.Item>
          <label htmlFor="">Tuổi</label>
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
        <Form.Item>
          <label htmlFor="">Email</label>
          <Input
            value={editStaff?.email}
            onChange={(e) => {
              setEditStaff((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label htmlFor="">SDT</label>
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
              // defaultValue="IT"
              style={{
                width: 120,
              }}
              value={editStaff?.company.department}
              onChange={(value) => {
                setEditStaff((pre) => {
                  return { ...pre, company: { department: value } };
                });
              }}
              options={options}
              // options={[
              //   {
              //     value: "IT",
              //     label: "IT",
              //   },
              //   {
              //     value: "Support",
              //     label: "Support",
              //   },
              //   {
              //     value: "Services",
              //     label: "Services",
              //   },
              //   {
              //     value: "Marketing",
              //     label: "Marketing",
              //   },
              // ]}
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
