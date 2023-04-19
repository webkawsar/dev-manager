import { format } from "date-fns";
import React, { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
import { ContactContext } from "../../context/Contact.context";

const Contact = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const { user } = useContext(AuthContext);

  const {
    id,
    firstName,
    lastName,
    email,
    gender,
    profession,
    image,
    dob,
    bio,
    author,
  } = contact;

  const handleDelete = (id) => {
    deleteContact(id);
  };

  const isOwner = user?.id === author?.data?.id ? author?.data?.id : author?.id;

  let imageUrl = "";
  if (image?.data?.attributes) {
    if (image?.data?.attributes?.formats?.large?.url) {
      imageUrl = image?.data?.attributes?.formats?.large?.url;
    } else if (image?.data?.attributes?.formats?.medium?.url) {
      imageUrl = image?.data?.attributes?.formats?.medium?.url;
    } else if (image?.data?.attributes?.formats?.small?.url) {
      imageUrl = image?.data?.attributes?.formats?.small?.url;
    } else {
      imageUrl = image?.data?.attributes?.formats?.thumbnail?.url;
    }
  } else {
    if (image?.formats?.large?.url) {
      imageUrl = image?.formats?.large?.url;
    } else if (image?.formats?.medium?.url) {
      imageUrl = image?.formats?.medium?.url;
    } else if (image?.formats?.small?.url) {
      imageUrl = image?.formats?.small?.url;
    } else {
      imageUrl = image?.formats?.thumbnail?.url;
    }
  }

  return (
    <>
      <Col md={6}>
        <Card>
          <Row className="g-0">
            <Col md={5}>
              <Card.Img src={imageUrl} className="h-100" />
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

              <Card.Footer>
                <Link to={`/contacts/${id}`}>
                  <Button variant="warning">
                    <FaEye />
                  </Button>
                </Link>

                {isOwner && (
                  <Button
                    variant="danger ms-3"
                    onClick={() => handleDelete(id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                )}
              </Card.Footer>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default Contact;
