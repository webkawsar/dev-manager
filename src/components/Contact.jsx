import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';


const Contact = ({contact}) => {

    const {id, first_name, last_name, email, gender, profession, image, dob, bio} = contact;
   
    // "id": 1,
    // "first_name": "Ingaborg",
    // "last_name": "Kimberley",
    // "email": "ikimberley0@goo.ne.jp",
    // "gender": "Female",
    // "profession": "Structural Engineer",
    // "image": "https://robohash.org/delenitisaepedolor.png?size=200x200&set=set1",
    // "dob": "16/05/2022",
    // "bio": 

    return (
        <>
            <Col md={6}>
                <Card>
                    <Row className='g-0'>
                        <Col md={5}>
                            <Card.Img className='contact_image' src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22731%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20731%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1828580aaac%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A37pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1828580aaac%22%3E%3Crect%20width%3D%22731%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22274.3984375%22%20y%3D%22109.5%22%3E731x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                        </Col>
                        <Col md={7}>
                            <Card.Body>
                                <Card.Title>{first_name} {last_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{profession}</Card.Subtitle>
                                <Card.Text>
                                    {bio}
                                </Card.Text>
                            </Card.Body>
                            
                            <ListGroup variant="flush">
                                <ListGroup.Item>Email: {email}</ListGroup.Item>
                                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                                <ListGroup.Item>Date of Birth: {dob}</ListGroup.Item>
                            </ListGroup>

                            

                            <Card.Footer>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Footer>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </>
    );
};

export default Contact;