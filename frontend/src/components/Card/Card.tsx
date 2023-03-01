import { FC, useState } from "react";
import { Contact } from "../../types/Contact";
import { Button, Form, Input, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

type CardProps = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  name: string;
  phone: string;
};

type EditValues = {
  name: string;
  phone: string;
};

const Card: FC<CardProps> = ({ contacts, setContacts, name, phone }) => {
  const [form] = Form.useForm();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const nameValue = Form.useWatch("name", form);
  const phoneValue = Form.useWatch("phone", form);

  const handleOpenModal = () => {
    setIsEditOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    form.resetFields();
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this contact?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      maskClosable: true,
    });
  };

  return (
    <>
      <div className={s.card}>
        <div>
          <p>
            <UserOutlined />
            <span className={s.contactText}>{name}</span>
          </p>
          <p>
            <PhoneOutlined />
            <span className={s.contactText}>{phone}</span>
          </p>
        </div>
        <div>
          <p>
            <Button icon={<EditOutlined />} onClick={handleOpenModal}>
              <span className={s.buttonText}>Edit</span>
            </Button>
          </p>
          <p>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={showDeleteConfirm}
            >
              <span className={s.buttonText}>Delete</span>
            </Button>
          </p>
        </div>
      </div>
      <Modal
        open={isEditOpen}
        title="Edit mode"
        okText="Submit"
        onCancel={handleCloseModal}
        // onOk={handleUpdateContact}
        okButtonProps={{
          disabled:
            (nameValue === name || nameValue === undefined) &&
            (phoneValue === phone || phoneValue === undefined),
        }}
        // okDi
        // footer={null}
      >
        <Form initialValues={{ name, phone }} form={form}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Phone is required!" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { Card };