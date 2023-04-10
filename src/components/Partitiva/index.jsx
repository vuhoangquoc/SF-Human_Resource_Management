import { Space, Table, Typography,Button } from "antd";
import { useState } from "react";
import { PartitiveData } from "../../dummyDate";


function Partitive() {
  const [items,setItem] = useState(PartitiveData);
  
 
  const handleAdd =(record,values) =>{
   console.log(record);
  }
  const handleEdit =(record) =>{
   console.log(record.key);
  }
  const handleDelete =(record) =>{
   const updatedItems = items.filter(item => item.key !== record.key);
   setItem(updatedItems);
   console.log(record);
  }
   return (
     <Space size={20} direction="vertical">
       <Typography.Title level={4}>Partitive</Typography.Title>
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
               <Button onClick={() => handleAdd(record)}>Thêm</Button>
               <Button onClick={() => handleEdit(record)}>Sửa</Button>
               <Button onClick={() => handleDelete(record)}>Xóa</Button>
             </Space>
             )
           }
         ]}
           dataSource={items}
           pagination={{
             pageSize: 5
           }}
   />
     </Space>
   );
 }
 export default Partitive;