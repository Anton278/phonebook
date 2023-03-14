import s from "../../styles/contacts.module.scss";
import { Input, Spin, Typography } from "antd";
import Header from "../../components/Header";
import { Paper } from "../../components/Paper";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Contact } from "../../types/Contact";
import { withProtected } from "@/hocs/withProtected";
import { Container } from "@/components/Container";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectContacts,
  selectError,
  selectStatus,
} from "@/redux/contacts/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getContacts } from "@/redux/contacts/thunks";

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([]);
  const [searchName, setSearchName] = useState("");

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  useEffect(() => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchName.toLocaleLowerCase())
    );
    setSearchedContacts(filteredContacts);
  }, [searchName, contacts]);

  return (
    <>
      <Header />
      <Container justifyCenter>
        <Paper>
          <Input
            placeholder="Find contacts by name"
            prefix={<SearchOutlined />}
            value={searchName}
            onChange={handleNameChange}
          />
          {status === "loading" ? (
            <div className={s.loaderWrapper}>
              <Spin />
            </div>
          ) : status === "error" ? (
            <Typography.Paragraph type="danger" className={s.errorText}>
              {error}
            </Typography.Paragraph>
          ) : searchedContacts.length ? (
            <div className={s.cardsWrapper}>
              {searchedContacts.map((contact) => (
                <Card {...contact} key={contact.id} />
              ))}
            </div>
          ) : (
            <p>There is no contacts</p>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default withProtected(Contacts);
