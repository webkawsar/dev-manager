import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';




const AddContact = ({addContact}) => {

    const initialState = {
        id: uuidv4(),
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        profession: '',
        image: '',
        dob: new Date().getFullYear(),
        bio: ''
    }
    
    const [contact, setContact] = useState(initialState)

    const handleInputChange = (e) => {

        setContact({...contact, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // checking validation

        // form submission
        addContact(contact);

        // reset input data
        setContact(initialState);
    }

    
    const {first_name, last_name, email, gender, profession, image, dob, bio} = contact;
    return (
        <div>
            <h2 className='text-center'>Add Contact</h2>

            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="first_name" value={first_name} onChange={handleInputChange} />
                        
                        {/* <Form.Text className="text-muted">
                            First name is required
                        </Form.Text> */}
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" name="last_name" onChange={handleInputChange} value={last_name} />
                        {/* <Form.Text className="text-muted">
                            Last name is required
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInputChange} value={email}  />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>


                    <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
                        <Form.Label>Profession</Form.Label>

                        <Form.Select name="profession" onChange={handleInputChange} value={profession}>
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
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Link of image URL" name="image" onChange={handleInputChange} value={image} />
                    </Form.Group>


                    <Form.Group className="mb-3" as={Col} md={6} controlId="Birth of Date">
                        <Form.Label>Birth of Date</Form.Label>
                        <Form.Control type="date" placeholder="birth of Date" name="dob" onChange={handleInputChange} value={dob} />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={12} controlId="bio">
                        <Form.Label>BIO</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write your bio" name="bio" onChange={handleInputChange} value={bio} />
                        {/* <Form.Text className="text-muted">
                            First name is required
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
                        <Form.Check type="radio" inline label="Male" name="gender" id="male" onChange={handleInputChange} value="male" checked={gender === 'male'} />
                        <Form.Check type="radio" inline label="Female" name="gender" id="female" onChange={handleInputChange} value="female" checked={gender === 'female'} />
                    </Form.Group>


                </Row>    


                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Agreed to Dev Manager terms & conditions" name="agreedPolicy" />
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddContact;