import s from "../styles/index.module.scss";
import Header from "../components/Header";
import { Typography, Button, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <>
      <Header />
      <Row justify="center">
        <Col xl={20} md={22} xs={24}>
          <main className={s.main}>
            <Title level={1}>Welcome to Phonebook App</Title>
            <Paragraph>
              Are you looking for a free contact management tool that’ll help
              you become more productive and speed up the communication process?
              If yes, then Phonebook is the app for you. It lets you store all
              your contacts under a single umbrella.
            </Paragraph>
            <Button type="primary" size="large">
              Get Started
            </Button>
          </main>
        </Col>
      </Row>
    </>
  );
};

export default Home;
