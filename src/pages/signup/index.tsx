import s from "../../styles/signup.module.scss";
import Header from "../../components/Header";
import { FC, useContext } from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
import { Paper } from "../../components/Paper";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { signup } from "../../redux/auth/thunks";
import { SignupValues } from "../../types/SignupValues";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectSignupError,
  selectIsSignupProcessing,
} from "../../redux/auth/selectors";
import { MessagesContext } from "../_app";

const Signup: FC = () => {
  const messageApi = useContext(MessagesContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectSignupError);
  const isProcessing = useAppSelector(selectIsSignupProcessing);

  const handleSignup = async (values: SignupValues) => {
    try {
      await dispatch(signup(values)).unwrap();
      messageApi?.success("Successfully registered!");
      router.push("/signin");
    } catch (e) {}
  };

  return (
    <>
      <Header />
      <Row justify="center" className={s.row}>
        <Col xl={20} md={22} xs={24}>
          <Row justify="center">
            <Col lg={14} md={18} sm={20} xs={24}>
              <Paper>
                <Form className={s.form} onFinish={handleSignup}>
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
                  {error && (
                    <Typography.Paragraph type="danger">
                      {error}
                    </Typography.Paragraph>
                  )}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isProcessing}
                    >
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
