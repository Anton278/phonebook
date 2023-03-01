import s from "../../styles/signin.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC } from "react";
import { Input, Button, Form, Typography } from "antd";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectIsSigninProcessing,
  selectSigninError,
} from "../../redux/auth/selectors";
import { signin } from "../../redux/auth/thunks";
import { SigninValues } from "../../types/SigninValues";
import { withOnlyPublic } from "@/hocs/withOnlyPublic";
import { Container } from "@/components/Container";

const Signin: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isProcessing = useAppSelector(selectIsSigninProcessing);
  const error = useAppSelector(selectSigninError);

  const handleSignin = async (values: SigninValues) => {
    try {
      await dispatch(signin(values));
      router.push("/contacts");
    } catch (e) {}
  };

  return (
    <>
      <Header />
      <Container justifyCenter>
        <Paper>
          <Form className={s.form} onFinish={handleSignin}>
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
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      </Container>
    </>
  );
};

export default withOnlyPublic(Signin);
