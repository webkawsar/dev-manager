import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hook-form";
import * as yup from "yup";


const schema = yup.object({
    firstName: yup.string().required("First name is Required").min(3, 'First name at least 3 character'),
    lastName: yup.string().required('Last name is Required').min(3, 'Last name at least 3 character'),
    email: yup.string().required('Email is Required').email('Must be a valid email'),
    profession: yup.string().required('Profession is required'),
    image: yup.string().required('Image link is required').url('Please add valid url link'),
    bio: yup.string().required('BIO is required').min(10, 'Write your BIO at least 10 character').max(100, 'BIO must be less than 100 character'),
    gender: yup.mixed().oneOf(['male', 'female'])
  }).required();


const AddContact = ({addContact}) => {

    const [birthDate, setBirthDate] = useState(new Date());
    const { register, handleSubmit, setValue, reset, formState:{ errors, isSubmitting, isSubmitSuccessful } } = useForm({resolver: yupResolver(schema)});
    const onSubmit = data => {

        console.log(data, 'data');
    }

    useEffect(() => {

        setValue('dob', birthDate);
        
    }, [birthDate])

    useEffect(() => {

        if(isSubmitSuccessful) {

            reset({
                firstName: '',
                lastName: '',
                email: '',
                profession: '',
                image: '',
                bio: '',
                gender: ''
            })

            setBirthDate(new Date());
        }

    }, [isSubmitSuccessful])



    return (
        <div>
            <h2 className='text-center'>Add Contact</h2>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                    <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" {...register('firstName')} />

                        {
                            errors?.firstName?.message && <Form.Text className="text-danger">
                                {errors?.firstName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" {...register('lastName')} />

                        {
                            errors?.lastName?.message && <Form.Text className="text-danger">
                                {errors?.lastName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email address" {...register('email')} />

                        {
                            errors?.email?.message && <Form.Text className="text-danger">
                                {errors?.email?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
                        <Form.Label>Profession</Form.Label>

                        <Form.Select {...register('profession')}>
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
                        
                        <Form.Control type="text" placeholder="Link of image URL" {...register('image')} />

                        {
                            errors?.image?.message && <Form.Text className="text-danger">
                                {errors?.image?.message}
                            </Form.Text>
                        }
                    </Form.Group>


                 
                    
                    <Col md={6} >
                        <ReactDatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} maxDate={new Date()} showYearDropdown />
                    </Col>


                    <Form.Group className="mb-3" as={Col} md={6} controlId="bio">
                        <Form.Label>BIO</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write your bio" {...register('bio')} />

                        {
                            errors?.bio?.message && <Form.Text className="text-danger">
                                {errors?.bio?.message}
                            </Form.Text>
                        }
                    </Form.Group>



                    <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
                        <Form.Check type="radio" inline label="Male" id="male" value="male" {...register('gender')} defaultChecked={true} />
                        <Form.Check type="radio" inline label="Female" id="female" value="female" {...register('gender')} />

                        {
                            errors?.gender?.message && <Form.Text className="text-danger">
                                {errors?.gender?.message}
                            </Form.Text>
                        }
                    </Form.Group>


                </Row> 

                


                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Agreed to Dev Manager terms & conditions" name="agreedPolicy" />
                </Form.Group> */}

                <Button variant="primary" type="submit" disabled={isSubmitting ? 'disabled' : ''}>
                    Add Contact
                </Button>
            </Form>
        </div>
    );
};

export default AddContact;