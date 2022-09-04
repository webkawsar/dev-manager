import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { AuthContext } from "../context/Auth.context";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Row>
        <Col xl={{ span: 8, offset: 2 }}>
          <Card style={{ width: "30rem" }}>
            {/* <Card.Img className='contact_image' src={image} /> */}
            <Card.Img
              className="contact_image"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22731%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20731%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1828580aaac%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A37pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1828580aaac%22%3E%3Crect%20width%3D%22731%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22274.3984375%22%20y%3D%22109.5%22%3E731x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            />

            <Card.Body>
              <Card.Title>
                {"John"} {"Doe"}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"Software Kamla"}
              </Card.Subtitle>
              <Card.Text>{"Mara gese ei line e ase"}</Card.Text>
            </Card.Body>

            <ListGroup variant="flush">
              <ListGroup.Item>Email: {"john@gmail.com"}</ListGroup.Item>
              <ListGroup.Item>Gender: {"Male"}</ListGroup.Item>
              <ListGroup.Item>
                Date of Birth: {"Jonmer tarik jana nai"}
              </ListGroup.Item>
            </ListGroup>

            {/* {isOwner && (
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
                )} */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
