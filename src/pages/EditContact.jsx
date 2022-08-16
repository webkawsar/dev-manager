import React from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/contacts/ContactForm';




const EditContact = ({contacts, updateContact}) => {

    const {contactId} = useParams();
    const foundContact = contacts.find((contact) => contact.id === contactId);

    return (
        <div>
            <ContactForm contact={foundContact} updateContact={updateContact} />
        </div>
    );
};

export default EditContact;