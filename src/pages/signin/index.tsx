import s from "../../styles/signin.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC } from "react";
import { Row, Col, Input, Button, Form } from "antd";

type SigninValues = {
  email: string;
  password: string;
};

const Signin: FC = () => {
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
                      Sign In
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

export default Signin;
