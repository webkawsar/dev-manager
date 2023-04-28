import React, { useContext } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import Contact from "../components/contacts/Contact";
import { ContactContext } from "../context/Contact.context";
import ContactsLoader from "../ui/ContactsLoader";

const generateArr = (num) => {
  const nums = [];
  for (let i = 1; i <= num; i++) {
    nums.push(i);
  }
  return nums;
};

const Contacts = () => {
  const { loaded, contacts, pageNumber, setPageNumber, pageCount } =
    useContext(ContactContext);

  const paginationArr = generateArr(pageCount);

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
      <div className="mt-5">
        <Pagination className="justify-content-center">
          {paginationArr.map((count) => {
            return (
              <Pagination.Item
                key={count}
                active={count === pageNumber}
                onClick={() => setPageNumber(count)}
              >
                {count}{" "}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </div>
    </>
  );
};

export default Contacts;
