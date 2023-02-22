import s from "../../styles/addContact.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC } from "react";
import { Button, Form, Input } from "antd";
import { withProtected } from "@/hocs/withProtected";
import { Container } from "@/components/Container";

const AddContact: FC = () => {
  return (
    <>
      <Header />
      <Container justifyCenter>
        <Paper>
          <Form className={s.form}>
            <Form.Item
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input phone!" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
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
