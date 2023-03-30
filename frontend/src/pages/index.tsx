import s from "../styles/index.module.scss";
import Header from "../components/Header";
import { Typography, Button } from "antd";
import Image from "next/image";
import people from "../assets/images/people.png";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth, selectIsLoading } from "@/redux/auth/selectors";
import { Container } from "@/components/Container";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { refreshAccessToken } from "@/redux/auth/thunks";
import { FullscreenSpin } from "@/components/FullscreenSpin";

const { Title, Paragraph } = Typography;

const Home = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (auth) {
      return;
    }
    if (localStorage.getItem("token")) {
      dispatch(refreshAccessToken());
    }
  }, []);

  return isLoading ? (
    <FullscreenSpin />
  ) : (
    <>
      <Header />
      <Container>
        <main className={s.main}>
          <div className={s.col}>
            <Title level={1}>Welcome to Phonebook App</Title>
            <Paragraph>
              Are you looking for a free contact management tool that’ll help
              you become more productive and speed up the communication process?
              If yes, then Phonebook is the app for you. It lets you store all
              your contacts under a single umbrella.
            </Paragraph>
            <Link href={auth ? "/contacts" : "signin"}>
              <Button type="primary" size="large">
                Get Started
              </Button>
            </Link>
          </div>
          <div className={s.col}>
            <Image
              src={people}
              alt="People with phones"
              width={540}
              height={540}
              quality={100}
              priority
            />
          </div>
        </main>
      </Container>
    </>
  );
};

export default Home;
