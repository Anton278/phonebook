import { FC, useState } from "react";
import { Contact } from "../../types/Contact";
import { Button, Form, Input, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
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
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
            <Button icon={<DeleteOutlined />} danger>
              <span className={s.buttonText}>Delete</span>
            </Button>
          </p>
        </div>
      </div>
      <Modal
        open={modalOpen}
        title="Edit mode"
        okText="Submit"
        onCancel={handleCloseModal}
        // onOk={handleUpdateContact}
        // okButtonProps={{ disabled: submitDisabled }}
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
