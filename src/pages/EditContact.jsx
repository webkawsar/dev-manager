import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/contacts/ContactForm';
import { ContactContext } from '../context/Contact.context';




const EditContact = () => {

    const {contacts} = useContext(ContactContext);
    const {contactId} = useParams();
    
    const foundContact = contacts.find((contact) => contact.id === +contactId);

    return (
        <div>
            <ContactForm contact={foundContact} />
        </div>
    );
};

export default EditContact;