import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetContactQuery } from "../features/contacts/contactsAPI";
import ContactLoader from "../ui/ContactLoader";
import formatImageUrl from "../utils/formatImageUrl";
import { formateContact } from "../utils/formateContact";

const ContactDetails = () => {
  const { contactId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetContactQuery(contactId);
  const { user } = useSelector((state) => state.auth);

  const handleDelete = (id) => {
    deleteContact(id);
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <ContactLoader />;
  }

  if (isSuccess && Object.keys(data).length === 0) {
    content = (
      <h2 style={{ color: "red", textAlign: "center" }}>No Contact to Show</h2>
    );
  }

  if (isSuccess && Object.keys(data).length) {
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
    } = formateContact(data?.data);
    const isOwner =
      user?.id === author?.data?.id ? author?.data?.id : author?.id;

    const imageUrl = formatImageUrl(image);

    content = (
      <Col md={12}>
        <Card>
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

                  <Button
                    variant="danger ms-3"
                    onClick={() => handleDelete(id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </Card.Footer>
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }

  return (
    <>
      <Row>{content}</Row>
    </>
  );
};

export default ContactDetails;
