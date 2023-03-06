import s from "./Header.module.scss";
import { Button } from "antd";
import {
  HomeFilled,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  ContactsOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/auth/selectors";
import { Container } from "../Container";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/redux/auth/thunks";

const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectIsAuth);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={s.header}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.buttons}>
            <Link href="/">
              <Button
                type={router.pathname === "/" ? "primary" : "default"}
                size="large"
                icon={<HomeFilled />}
                data-testid="home-btn"
              >
                <span className={s.buttonText}>Home</span>
              </Button>
            </Link>
            {auth && (
              <>
                <Link href="/contacts">
                  <Button
                    type={
                      router.pathname === "/contacts" ? "primary" : "default"
                    }
                    size="large"
                    icon={<ContactsOutlined />}
                  >
                    <span className={s.buttonText}>Contacts</span>
                  </Button>
                </Link>
                <Link href="/add-contact">
                  <Button
                    type={
                      router.pathname === "/add-contact" ? "primary" : "default"
                    }
                    size="large"
                    icon={<PlusOutlined />}
                  >
                    <span className={s.buttonText}>Add contact</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className={s.buttons}>
            {auth ? (
              <Button
                size="large"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                <span className={s.buttonText}>Sign Out</span>
              </Button>
            ) : (
              <>
                <Link href="/signup">
                  <Button
                    size="large"
                    icon={<UserAddOutlined />}
                    type={router.pathname === "/signup" ? "primary" : "default"}
                  >
                    <span className={s.buttonText}>Sign Up</span>
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button
                    size="large"
                    icon={<LoginOutlined />}
                    type={router.pathname === "/signin" ? "primary" : "default"}
                  >
                    <span className={s.buttonText}>Sign In</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
