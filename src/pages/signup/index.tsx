import s from "../../styles/signup.module.scss";
import Header from "../../components/Header";
import { FC } from "react";
import { Row, Col, Input, Button, Form } from "antd";
import { Paper } from "../../components/Paper";

const Signup: FC = () => {
  return (
    <>
      <Header />
      <Row justify="center" className={s.row}>
        <Col xl={20} md={22} xs={24}>
          <Row justify="center">
            <Col lg={14} md={18} sm={20} xs={24}>
              <Paper>
                <Form className={s.form}>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" type="email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
