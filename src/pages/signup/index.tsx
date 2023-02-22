import s from "../../styles/signup.module.scss";
import Header from "../../components/Header";
import { FC, useContext } from "react";
import { Input, Button, Form, Typography } from "antd";
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
import { withOnlyPublic } from "@/hocs/withOnlyPublic";
import { Container } from "@/components/Container";

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
      <Container justifyCenter>
        <Paper>
          <Form className={s.form} onFinish={handleSignup}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
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
              <Typography.Paragraph type="danger">{error}</Typography.Paragraph>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isProcessing}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      </Container>
    </>
  );
};

export default withOnlyPublic(Signup);
