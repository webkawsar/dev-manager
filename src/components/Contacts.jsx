import React from 'react';
import { Row } from 'react-bootstrap';
import Contact from './Contact';





const Contacts = ({contacts}) => {
    return (
        <>
            <h2 className='text-center'>All Contacts</h2>
            <Row className='g-3'>
                {
                    contacts.map((contact) => <Contact key={contact.id} contact={contact} />)
                }
            </Row>
        </>
    );
};

export default Contacts;