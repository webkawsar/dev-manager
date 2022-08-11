import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';




// "id": 1,
// "first_name": "Ingaborg",
// "last_name": "Kimberley",
// "email": "ikimberley0@goo.ne.jp",
// "gender": "Female",
// "profession": "Structural Engineer",
// "image": "https://robohash.org/delenitisaepedolor.png?size=200x200&set=set1",
// "dob": "16/05/2022",
// "bio":



const AddContact = () => {


    
    return (
        <div>
            <h2 className='text-center'>Add Contact</h2>

            <Form>
                <Row>
                    <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" />
                        {/* <Form.Text className="text-muted">
                            First name is required
                        </Form.Text> */}
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" />
                        {/* <Form.Text className="text-muted">
                            Last name is required
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>


                    <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
                        <Form.Label>Profession</Form.Label>

                        <Form.Select>
                            <option value="">Select your profession</option>
                            <option value="software_engineer">Software Engineer</option>
                            <option value="web_developer">Web Developer</option>
                            <option value="js_developer">JS Developer</option>
                        </Form.Select>

                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="Image">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Image URL" />
                    </Form.Group>



                    <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
                        <Form.Label>Gender</Form.Label>

                        <Form.Select>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>

                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={12} controlId="bio">
                        <Form.Label>BIO</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write your bio" />
                        {/* <Form.Text className="text-muted">
                            First name is required
                        </Form.Text> */}
                    </Form.Group>

                </Row>    


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Agreed terms & conditions" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddContact;