import React from 'react';
import { Row } from 'react-bootstrap';
import Contact from '../components/contacts/Contact';





const Contacts = ({contacts, deleteContact}) => {
    return (
        <>
            <h2 className='text-center mb-3'>All Contacts</h2>
            <Row className='g-3'>
                {
                    contacts.map((contact) => <Contact key={contact.id} contact={contact} deleteContact={deleteContact} />)
                }
            </Row>
        </>
    );
};

export default Contacts;