import { FC, useContext, useState } from "react";
import { Contact } from "../../types/Contact";
import { Button, Form, Input, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { AuthContext } from "@/pages/_app";

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
  const auth = useContext(AuthContext);
  const [form] = Form.useForm();
  console.log(form);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateContact = async () => {
    try {
      // setIsUpdating()
      const values = await form.validateFields();

      if (!auth) {
        return;
      }
      if (!auth.user?.uid) {
        return;
      }
      let updatedContacts: Contact[] = contacts.map((contact) =>
        contact.name === name ? values : contact
      );
      console.log("updatedContacts ===> ", updatedContacts);
      const response = await updateDoc(doc(db, "users", auth.user.uid), {
        contacts: updatedContacts,
      });
      // setContacts(updatedContacts);
    } catch (e) {}
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
        onOk={handleUpdateContact}
        okButtonProps={{ disabled: submitDisabled }}
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
