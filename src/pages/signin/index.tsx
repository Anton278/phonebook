import s from "../../styles/signin.module.scss";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { FC } from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
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
      <Row justify="center" className={s.row}>
        <Col xl={20} md={22} xs={24}>
          <Row justify="center">
            <Col lg={14} md={18} sm={20} xs={24}>
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

export default withOnlyPublic(Signin);
