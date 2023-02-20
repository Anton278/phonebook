import s from "./Header.module.scss";
import { useRouter } from "next/router";
import { Button, Col, Row } from "antd";
import {
  HomeFilled,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

const Header = () => {
  const router = useRouter();

  const handleRedirect = (to: string): void => {
    router.push(to);
  };

  return (
    <header className={s.header}>
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.col}>
          <div className={s.buttons}>
            <Button
              type="primary"
              size="large"
              icon={<HomeFilled />}
              onClick={() => handleRedirect("/")}
              data-testid="home-btn"
            >
              <span className={s.buttonText}>Home</span>
            </Button>
            {/* {auth?.user && (
              <Button
                type="primary"
                size="large"
                icon={<ContactsOutlined />}
                onClick={() => handleRedirect("/contacts")}
              >
                <span className={s.buttonText}>Contacts</span>
              </Button>
            )} */}
          </div>
          <div className={s.buttons}>
            {/* {auth?.user ? (
              <Button size="large" icon={<LogoutOutlined />}>
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
            )} */}
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
