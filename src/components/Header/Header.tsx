import s from "./Header.module.scss";
import { useRouter } from "next/router";
import { Button, Col, Row } from "antd";
import {
  HomeFilled,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../../pages/_app";

const Header = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleRedirect = (to: string): void => {
    router.push(to);
  };

  const signout = () => {
    if (!auth) {
      return;
    }

    auth.signout();
  };

  return (
    <header className={s.header}>
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.col}>
          <Button
            type="primary"
            size="large"
            icon={<HomeFilled />}
            onClick={() => handleRedirect("/")}
            data-testid="home-btn"
          >
            <span className={s.buttonText}>Home</span>
          </Button>
          <div className={s.rightButtons}>
            {auth?.user ? (
              <Button size="large" icon={<LogoutOutlined />} onClick={signout}>
                <span className={s.buttonText}>Sign Out</span>
              </Button>
            ) : (
              <>
                <Button
                  size="large"
                  icon={<UserAddOutlined />}
                  onClick={() => handleRedirect("/signup")}
                >
                  <span className={s.buttonText}>Sign Up</span>
                </Button>
                <Button
                  size="large"
                  icon={<LoginOutlined />}
                  onClick={() => handleRedirect("/signin")}
                >
                  <span className={s.buttonText}>Sign In</span>
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
