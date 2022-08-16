import React from 'react';
import ContactForm from '../components/contacts/ContactForm';




const AddContact = ({addContact}) => {
    return (
        <div>
            <ContactForm addContact={addContact} />
        </div>
    );
};

export default AddContact;