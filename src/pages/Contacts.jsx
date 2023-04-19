import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Contact from "../components/contacts/Contact";
import { ContactContext } from "../context/Contact.context";

const Contacts = () => {
  const { loaded, contacts } = useContext(ContactContext);

  // decide what to render
  let content = null;
  if (!loaded) content = <Loader />;
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
