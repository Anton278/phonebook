import { FC, useState } from "react";
import { Contact } from "../../types/Contact";
import { Button, Form, Input, Modal, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteContact, updateContact } from "@/redux/contacts/thunks";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectDeleteError,
  selectIsDeleting,
  selectIsUpdating,
  selectUpdateError,
} from "@/redux/contacts/selectors";

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const Card: FC<Contact> = ({ name, phone, id }) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectIsUpdating);
  const error = useAppSelector(selectUpdateError);
  const isDeleting = useAppSelector(selectIsDeleting);
  const deleteError = useAppSelector(selectDeleteError);
  const [form] = Form.useForm();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const nameValue = Form.useWatch("name", form);
  const phoneValue = Form.useWatch("phone", form);

  const handleUpdateContact = async () => {
    try {
      await dispatch(
        updateContact({ name: nameValue, phone: phoneValue, contactId: id })
      ).unwrap();
      setIsEditOpen(false);
    } catch (e) {}
  };

  const handleDeleteContact = async () => {
    dispatch(deleteContact(id));
  };

  const handleOpenModal = () => {
    setIsEditOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    form.resetFields();
  };

  const showDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
  };

  const hideDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const deleteConfirmTitle = (
    <div className={s.deleteConfirmTitle}>
      <ExclamationCircleFilled className={s.deleteConfirmIcon} />
      <span className={s.deleteConfirmText}>
        Are you sure delete this contact?
      </span>
    </div>
  );

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
        onOk={handleUpdateContact}
        okButtonProps={{
          disabled:
            (nameValue === name || nameValue === undefined) &&
            (phoneValue === phone || phoneValue === undefined),
          loading: isUpdating,
        }}
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
          {error && (
            <Typography.Paragraph type="danger">{error}</Typography.Paragraph>
          )}
        </Form>
      </Modal>
      <Modal
        title={deleteConfirmTitle}
        open={isDeleteConfirmOpen}
        onCancel={hideDeleteConfirm}
        okButtonProps={{ danger: true, type: "default", loading: isDeleting }}
        okText="Yes"
        cancelText="No"
        onOk={handleDeleteContact}
        closable={false}
      >
        {deleteError && (
          <Typography.Paragraph type="danger">
            {deleteError}
          </Typography.Paragraph>
        )}
      </Modal>
    </>
  );
};

export { Card };
