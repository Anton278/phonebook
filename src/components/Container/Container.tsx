import { Col, Row } from "antd";
import { FC } from "react";
import s from "./Container.module.scss";

type ContainerProps = {
  justifyCenter?: boolean;
  children?: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children, justifyCenter }) => {
  return (
    <Row justify="center" className={s.container}>
      <Col
        xl={20}
        md={22}
        xs={24}
        className={justifyCenter ? s.justifyCenter : ""}
      >
        {children}
      </Col>
    </Row>
  );
};

export { Container };
