import s from "../../styles/addContact.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { withProtected } from "@/hocs/withProtected";

const AddContact: FC = () => {
  return (
    <>
      <Header />
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.wrapper}>
          <Paper>
            <Form className={s.form}>
              <Form.Item
                rules={[{ required: true, message: "Please enter Name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please enter Phone!" }]}
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
        </Col>
      </Row>
    </>
  );
};

export default withProtected(AddContact);
