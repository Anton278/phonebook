import s from "../../styles/contacts.module.scss";
import { Col, Input, Row, Spin, Typography } from "antd";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { SearchOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { AuthContext } from "../_app";
import { Card } from "../../components/Card";
import { Contact } from "../../types/Contact";

const Contacts = () => {
  const auth = useContext(AuthContext);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      if (!auth) {
        return;
      }

      if (!auth.user?.uid) {
        return;
      }

      try {
        const response = await getDoc(doc(db, "users", auth.user.uid));
        if (!response.exists()) {
          return;
        }
        const contacts: Contact[] = response.data().contacts;
        setContacts(contacts);
        setIsLoading(false);
      } catch (e) {
        let message = "Unknown error";
        if (e instanceof Error) {
          message = e.message;
        }
        setError(message);
        setIsLoading(false);
      }
    };

    getContacts();
  }, []);

  return (
    <>
      <Header />
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.wrapper}>
          <Paper>
            <Input
              placeholder="Find contacts by name"
              prefix={<SearchOutlined />}
            />
            {isLoading ? (
              <div className={s.loaderWrapper}>
                <Spin />
              </div>
            ) : error ? (
              <Typography.Paragraph type="danger" className={s.errorText}>
                {error}
              </Typography.Paragraph>
            ) : contacts.length ? (
              <div className={s.cardsWrapper}>
                {contacts.map((contact) => (
                  <Card {...contact} key={contact.name} />
                ))}
              </div>
            ) : (
              <p>There is no contacts</p>
            )}
          </Paper>
        </Col>
      </Row>
    </>
  );
};

export default Contacts;
