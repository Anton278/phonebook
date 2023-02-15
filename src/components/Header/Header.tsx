import s from "./Header.module.scss";
import { HomeFilled, UserAddOutlined, LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Header = () => {
  return (
    <header className={s.header}>
      <Button type="primary" icon={<HomeFilled />}>
        Home
      </Button>
      <div className={s.rightButtons}>
        <Button icon={<UserAddOutlined />}>Sign Up</Button>
        <Button icon={<LoginOutlined />}>Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
