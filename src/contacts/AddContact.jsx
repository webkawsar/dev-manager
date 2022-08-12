import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hook-form";






const AddContact = ({addContact}) => {

    const [birthDate, setBirthDate] = useState(new Date());
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const onSubmit = data => {

        console.log(data, 'data');
    }

    console.log(errors, 'errors');
    

    return (
        <div>
            <h2 className='text-center'>Add Contact</h2>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                    <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" {...register('firstName', {
                            required: 'First name is required',
                            minLength: {value: 3, message: 'First name at least 3 character'}
                        })} />

                        {
                            errors?.firstName?.message && <Form.Text className="text-danger">
                                {errors?.firstName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" {...register('lastName', {
                            required: 'Last name is required',
                            minLength: {value: 3, message: 'Last name at least 3 character'}
                        })} />

                        {
                            errors?.lastName?.message && <Form.Text className="text-danger">
                                {errors?.lastName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email address" {...register('email', {
                            required: 'Email is required',
                            minLength: {value: 10, message: 'Please add valid email'}
                        })} />

                        {
                            errors?.email?.message && <Form.Text className="text-danger">
                                {errors?.email?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
                        <Form.Label>Profession</Form.Label>

                        <Form.Select {...register('profession', {
                            required: 'Profession is required'
                        })}>
                            <option value="">Select your profession</option>
                            <option value="software_engineer">Software Engineer</option>
                            <option value="web_developer">Web Developer</option>
                            <option value="js_developer">JS Developer</option>
                        </Form.Select>

                        {
                            errors?.profession?.message && <Form.Text className="text-danger">
                                {errors?.profession?.message}
                            </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="Image">
                        <Form.Label>Image</Form.Label>
                        
                        <Form.Control type="text" placeholder="Link of image URL" {...register('image', {
                            required: 'Image link is required',
                            minLength: {value: 3, message: 'Image link at least 3 character'}
                        })} />

                        {
                            errors?.image?.message && <Form.Text className="text-danger">
                                {errors?.image?.message}
                            </Form.Text>
                        }
                    </Form.Group>


                 
                    
                    <Col md={6} >
                        <ReactDatePicker selected={birthDate} onChange={(date) => setBirthDate({ dob: date})} maxDate={new Date()} showYearDropdown />
                    </Col>


                    <Form.Group className="mb-3" as={Col} md={6} controlId="bio">
                        <Form.Label>BIO</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write your bio" {...register('bio', {
                            required: 'BIO is required',
                            minLength: {value: 3, message: 'BIO at least 10 character'}
                        })} />

                        {
                            errors?.bio?.message && <Form.Text className="text-danger">
                                {errors?.bio?.message}
                            </Form.Text>
                        }
                    </Form.Group>



                    <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
                        <Form.Check type="radio" inline label="Male" id="male" value="male" {...register('gender')} defaultChecked={true} />
                        <Form.Check type="radio" inline label="Female" id="female" value="female" {...register('gender')} />

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