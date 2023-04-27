import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Contact from "../components/contacts/Contact";
import { ContactContext } from "../context/Contact.context";
import ContactsLoader from "../ui/ContactsLoader";

const Contacts = () => {
  const { loaded, contacts } = useContext(ContactContext);

  // decide what to render
  let content = null;
  if (!loaded)
    content = (
      <>
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
      </>
    );
  if (loaded && contacts.length === 0) {
    content = (
      <Col sm>
        <Card body className="text-center">
          Contacts not found!
        </Card>
      </Col>
    );
  }
  if (loaded && contacts.length) {
    content = contacts.map((contact) => (
      <Contact key={contact.id} contact={contact} />
    ));
  }

  return (
    <>
      <h2 className="text-center mb-3">All Contacts</h2>
      <Row className="g-3">{content}</Row>
    </>
  );
};

export default Contacts;
