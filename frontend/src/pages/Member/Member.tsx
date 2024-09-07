import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Select, Card } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMembers, DeleteMemberByID } from "../../services/https";
import { MembersInterface } from "../../interfaces/IMember";
import { useNavigate } from "react-router-dom";
import "./Member.css"; // Import CSS

const { Option } = Select;

function Member() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MembersInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedEmail, setSelectedEmail] = useState<string | undefined>(undefined);
  const [emailOptions, setEmailOptions] = useState<string[]>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>();
  const [deleteId, setDeleteId] = useState<number>();

  const columns: ColumnsType<MembersInterface> = [
    {
      title: "No",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "FirstName",
      dataIndex: "FirstName",
      key: "firstname",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "gender",
      render: (item) => item.Name,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "TotalPoint",
      dataIndex: "TotalPoint",
      key: "totalpoint",
    },
    {
      title: "Manage",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record) => (
        <>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            className="delete-button"
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const getMembers = async () => {
    setLoading(true);
    try {
      let res = await GetMembers();
      if (res) {
        setMembers(res);
        setEmailOptions(res.map((member: MembersInterface) => member.Email));
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
    setLoading(false);
  };

  const showModal = (val: MembersInterface) => {
    setDeleteId(val.ID);
    setModalText(`คุณต้องการลบข้อมูลผู้ใช้ "${val.FirstName} ${val.LastName}" หรือไม่?`);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      let res = await DeleteMemberByID(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getMembers();
      } else {
        setOpen(false);
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาด !",
        });
      }
    } catch (error) {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการลบข้อมูล!",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div>
      <Card style={{ margin: "20px" }}>
        {contextHolder}
        {/* Header Section */}
        <div className="header">
          <div className="header-item search-email-container">
            <label>Email</label>
            <Select
              value={selectedEmail}
              showSearch
              className="email-select"
              allowClear
              placeholder="Select an Email"
              style={{ width: 200 }}
              optionFilterProp="children"
              onChange={(value) => setSelectedEmail(value as string)}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {emailOptions.map((email) => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </div>
          <div className="header-item">
            <Button className="add-btn" onClick={() => navigate("/add-member")}>
              <PlusOutlined /> Add
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="member-table-container">
          <Table rowKey="ID" columns={columns} dataSource={members} loading={loading} />
        </div>

        {/* Modal Section */}
        <Modal
          title="ลบข้อมูล ?"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </Card>
    </div>
  );
}

export default Member;
