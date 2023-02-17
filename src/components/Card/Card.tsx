import { FC } from "react";
import { Contact } from "../../types/Contact";
import { Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";

const Card: FC<Contact> = ({ name, phone }) => {
  return (
    <div className={s.card}>
      <div>
        <p>
          <UserOutlined />
          <span className={s.contactText}>{name}</span>
        </p>
        <p>
          <PhoneOutlined />
          <span className={s.contactText}>{phone}</span>
        </p>
      </div>
      <div>
        <p>
          <Button icon={<EditOutlined />}>
            <span className={s.buttonText}>Edit</span>
          </Button>
        </p>
        <p>
          <Button icon={<DeleteOutlined />} danger>
            <span className={s.buttonText}>Delete</span>
          </Button>
        </p>
      </div>
    </div>
  );
};

export { Card };
