import s from "../../styles/addContact.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC, useContext } from "react";
import { Button, Form, Input, Typography } from "antd";
import { withProtected } from "@/hocs/withProtected";
import { Container } from "@/components/Container";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addContact } from "@/redux/contacts/thunks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectError, selectStatus } from "@/redux/contacts/selectors";
import { MessagesContext } from "../_app";

type FormValues = {
  name: string;
  phone: string;
};

const AddContact: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const messageApi = useContext(MessagesContext);

  const handleAddContact = async (values: FormValues) => {
    try {
      await dispatch(addContact(values)).unwrap();
      messageApi?.success({ content: "Contact successfully added!" });
    } catch (e) {}
  };

  return (
    <>
      <Header />
      <Container justifyCenter>
        <Paper>
          <Form className={s.form} onFinish={handleAddContact}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            {status === "error" && (
              <Typography.Paragraph type="danger">{error}</Typography.Paragraph>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={status === "loading"}
              >
                Add contact
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      </Container>
    </>
  );
};

export default withProtected(AddContact);
