import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";






const AddContact = ({addContact}) => {

    // const initialState = {
    //     id: uuidv4(),
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     gender: '',
    //     profession: '',
    //     image: '',
    //     dob: new Date(),
    //     bio: ''
    // }
    
    // const [contact, setContact] = useState(initialState)

    // const handleInputChange = (e) => {

    //     setContact({...contact, [e.target.name]: e.target.value})
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // checking validation

    //     // form submission
    //     addContact(contact);

    //     // reset input data
    //     setContact(initialState);
    // }


    const { register, handleSubmit, formState:{ errors } } = useForm();
    const onSubmit = data => {

        console.log(data, 'data');
    }

    console.log(errors, 'errors');
    

    
    // const {first_name, last_name, email, gender, profession, image, dob, bio} = contact;
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