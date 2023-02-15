import s from "./Header.module.scss";
import { Button, Col, Row } from "antd";
import { HomeFilled, UserAddOutlined, LoginOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header className={s.header}>
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.col}>
          <Button type="primary" icon={<HomeFilled />}>
            <span className={s.buttonText}>Home</span>
          </Button>
          <div className={s.rightButtons}>
            <Button icon={<UserAddOutlined />}>
              <span className={s.buttonText}>Sign Up</span>
            </Button>
            <Button icon={<LoginOutlined />}>
              <span className={s.buttonText}>Sign In</span>
            </Button>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
