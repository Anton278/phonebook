import s from "../../styles/contacts.module.scss";
import { Col, Input, Row, Spin, Typography } from "antd";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Contact } from "../../types/Contact";
import { withProtected } from "@/hocs/withProtected";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchName.toLocaleLowerCase())
    );
    setSearchedContacts(filteredContacts);
  }, [searchName, contacts]);

  return (
    <>
      <Header />
      <Row justify="center">
        <Col xl={20} md={22} xs={24} className={s.wrapper}>
          <Paper>
            <Input
              placeholder="Find contacts by name"
              prefix={<SearchOutlined />}
              value={searchName}
              onChange={handleNameChange}
            />
            {isLoading ? (
              <div className={s.loaderWrapper}>
                <Spin />
              </div>
            ) : error ? (
              <Typography.Paragraph type="danger" className={s.errorText}>
                {error}
              </Typography.Paragraph>
            ) : searchedContacts.length ? (
              <div className={s.cardsWrapper}>
                {searchedContacts.map((contact) => (
                  <Card
                    contacts={contacts}
                    setContacts={setContacts}
                    {...contact}
                    key={contact.name}
                  />
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

export default withProtected(Contacts);
