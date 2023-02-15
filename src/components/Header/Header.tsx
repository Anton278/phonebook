import s from "./Header.module.scss";
import { useRouter } from "next/router";
import { Button, Col, Row } from "antd";
import { HomeFilled, UserAddOutlined, LoginOutlined } from "@ant-design/icons";

const Header = () => {
  const router = useRouter();

  const handleRedirect = (to: string): void => {
    console.log("redirect to home...");
    router.push(to);
  };

  return (
    <header className={s.header}>
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.col}>
          <Button
            type="primary"
            size="large"
            icon={<HomeFilled />}
            onClick={() => handleRedirect("")}
            data-testid="home-btn"
          >
            <span className={s.buttonText}>Home</span>
          </Button>
          <div className={s.rightButtons}>
            <Button size="large" icon={<UserAddOutlined />}>
              <span className={s.buttonText}>Sign Up</span>
            </Button>
            <Button size="large" icon={<LoginOutlined />}>
              <span className={s.buttonText}>Sign In</span>
            </Button>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
