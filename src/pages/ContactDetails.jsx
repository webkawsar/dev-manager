import React from 'react';
import { useParams } from 'react-router-dom';
import Contact from '../components/contacts/Contact';




const ContactDetails = ({contacts, deleteContact}) => {

    const {contactId} = useParams();
    const foundContact = contacts.find((contact) => contact.id === contactId);


    return (
        <>
            {
                foundContact ? <Contact contact={foundContact} deleteContact={deleteContact} /> : <div><h1 style={{color: 'red', textAlign: 'center'}}>Contact Not Found</h1></div>
            }
        </>
    );
};

export default ContactDetails;