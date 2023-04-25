import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ContactForm from "../components/contacts/ContactForm";
import { ContactContext } from "../context/Contact.context";

const EditContact = () => {
  const { loaded, contacts } = useContext(ContactContext);
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    if (loaded) {
      const foundContact = contacts.find(
        (contact) => contact.id === +contactId
      );
      if (contactId && foundContact) {
        setContact(foundContact);
      }
    }
  }, [loaded]);

  // decide what to render
  let content = null;
  if (!loaded) content = <Loader />;
  if (loaded && Object.keys(contact).length === 0) {
    content = (
      <h2 style={{ color: "red", textAlign: "center" }}>
        Contact not found to edit data
      </h2>
    );
  }
  if (loaded && Object.keys(contact).length) {
    content = <ContactForm contact={contact} />;
  }

  return <div>{content}</div>;
};

export default EditContact;
