import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { AuthContext } from "../context/Auth.context";
import { ContactContext } from "../context/Contact.context";
import formatImageUrl from "../utils/formatImageUrl";

const ContactDetails = () => {
  const { loaded, contacts, deleteContact } = useContext(ContactContext);
  const { user } = useContext(AuthContext);
  const { contactId } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    if (loaded) {
      const foundContact = contacts.find(
        (contact) => contact.id === Number(contactId)
      );
      if (contactId && foundContact) {
        setContact(foundContact);
      }
    }
  }, [loaded]);

  const handleDelete = (id) => {
    deleteContact(id);
  };

  const {
    id,
    firstName,
    lastName,
    email,
    profession,
    gender,
    bio,
    dob,
    author,
    image,
  } = contact;
  const isOwner = user?.id === author?.data?.id ? author?.data?.id : author?.id;

  // decide what to render
  let content = null;
  if (!loaded) content = <Loader />;
  if (loaded && Object.keys(contact).length === 0) {
    content = (
      <h2 style={{ color: "red", textAlign: "center" }}>No Contact to Show</h2>
    );
  }
  if (loaded && Object.keys(contact).length) {
    const imageUrl = formatImageUrl(image);

    content = (
      <Row className="g-0">
        <Col md={5}>
          <Card.Img className="contact_image" src={imageUrl} />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>
              {firstName} {lastName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-capitalize">
              {profession}
            </Card.Subtitle>
            <Card.Text>{bio}</Card.Text>
          </Card.Body>

          <ListGroup variant="flush">
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item className="text-capitalize">
              Gender: {gender}
            </ListGroup.Item>
            <ListGroup.Item>
              Date of Birth:{" "}
              {dob instanceof Object ? format(dob, "d-MMM-yyyy") : dob}
            </ListGroup.Item>
          </ListGroup>

          {isOwner && (
            <Card.Footer>
              <Link to={`/edit/contacts/${id}`}>
                <Button variant="warning">
                  <FaPencilAlt />
                </Button>
              </Link>

              <Button variant="danger ms-3" onClick={() => handleDelete(id)}>
                <FaRegTrashAlt />
              </Button>
            </Card.Footer>
          )}
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>{content}</Card>
        </Col>
      </Row>
    </>
  );
};

export default ContactDetails;
