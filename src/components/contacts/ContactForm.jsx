import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidV4 } from 'uuid';
import * as yup from "yup";




const schema = yup.object({
    first_name: yup.string().required("First name is Required").min(3, 'First name at least 3 character'),
    last_name: yup.string().required('Last name is Required').min(3, 'Last name at least 3 character'),
    email: yup.string().required('Email is Required').email('Must be a valid email'),
    profession: yup.string().required('Profession is required'),
    image: yup.string().required('Image link is required').url('Please add valid url link'),
    bio: yup.string().required('BIO is required').min(10, 'Write your BIO at least 10 character').max(100, 'BIO must be less than 100 character'),
    gender: yup.mixed().oneOf(['male', 'female'])
  }).required();


const ContactForm = ({addContact, contact, updateContact}) => {

    const defaultValue = {
        first_name: contact?.first_name || 'Kawsar',
        last_name: contact?.last_name || 'Ahmed',
        email: contact?.email || 'web.kawsarahmed@gmail.com',
        profession: contact?.profession || 'web_developer',
        image: contact?.image || 'https://facebook.com',
        bio: contact?.bio || 'Hi, This is Kawsar Ahmed',
        gender: contact?.gender || 'male'
    }
    
    const [birthDate, setBirthDate] = useState(new Date());
    const { register, handleSubmit, setValue, reset, formState:{ errors, isSubmitting, isSubmitSuccessful } } = useForm({resolver: yupResolver(schema)});
    const navigate = useNavigate();
    
    const onSubmit = data => {

        

        if(contact.id) {
            
            // update contact
            updateContact({...data, id: contact.id});
            
            // show flash message
            toast.success('Contact updated successfully');
            
        } else {
            
            // adding contact
            addContact({...data, id: uuidV4()});

            // show flash message
            toast.success('Contact added successfully');
        }
        
        navigate('/contacts');
    }

    useEffect(() => {

        setValue('dob', birthDate);
        
    }, [birthDate])

    useEffect(() => {

        if(isSubmitSuccessful) {

            reset({
                first_name: '',
                last_name: '',
                email: '',
                profession: '',
                image: '',
                bio: '',
                gender: ''
            })

            setBirthDate(new Date());
        }

    }, [isSubmitSuccessful])




    const {first_name, last_name, email, profession, image, bio, gender} = defaultValue;

    return (
        <div>
            <h2 className='text-center'>{contact?.id ? 'Edit Contact' : 'Add Contact'}</h2>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                    <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" {...register('first_name')} defaultValue={first_name} />

                        {
                            errors?.firstName?.message && <Form.Text className="text-danger">
                                {errors?.firstName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" {...register('last_name')} defaultValue={last_name} />

                        {
                            errors?.lastName?.message && <Form.Text className="text-danger">
                                {errors?.lastName?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email address" {...register('email')} defaultValue={email} />

                        {
                            errors?.email?.message && <Form.Text className="text-danger">
                                {errors?.email?.message}
                            </Form.Text>
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
                        <Form.Label>Profession</Form.Label>

                        <Form.Select {...register('profession')} defaultValue={profession}>
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
                        
                        <Form.Control type="text" placeholder="Link of image URL" {...register('image')} defaultValue={image} />

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
                        <Form.Control as="textarea" rows={3} placeholder="Write your bio" {...register('bio')} defaultValue={bio} />

                        {
                            errors?.bio?.message && <Form.Text className="text-danger">
                                {errors?.bio?.message}
                            </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
                        <Form.Check type="radio" inline label="Male" id="male" value="male" {...register('gender')} defaultChecked={gender === 'male'} />
                        <Form.Check type="radio" inline label="Female" id="female" value="female" {...register('gender')} defaultChecked={gender === 'female'} />

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
                    {contact?.id ? 'Update Contact' : 'Add Contact'}
                </Button>
            </Form>
        </div>
    );
};

export default ContactForm;