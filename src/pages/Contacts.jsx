import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import Contact from "../components/contacts/Contact";
import Loader from "../components/Loader";
import { ContactContext } from "../context/Contact.context";

const Contacts = () => {
  const { contacts, loaded } = useContext(ContactContext);

  return (
    <>
      <h2 className="text-center mb-3">All Contacts</h2>
      <Row className="g-3">
        {loaded ? (
          contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))
        ) : (
          <Loader />
        )}
      </Row>
    </>
  );
};

export default Contacts;
