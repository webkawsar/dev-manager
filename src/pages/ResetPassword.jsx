import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";



const schema = yup
  .object({
    password: yup.string().trim().required('Password is required'),
    confirmPassword: yup.string().trim().required('Password is required'),
  })
  .required();




  
const ResetPassword = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: yupResolver(schema),
      });
    
      const onSubmit = (data) => {
        
        // login user
       console.log(data);
      };
  
      
    return (
        <div>
            <h2 className="text-center mb-3">Reset Password</h2>
            <Row>
                <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        defaultValue=""
                        {...register("password")}
                        isInvalid={!!errors.password}
                    />
                    {
                        errors?.password?.message && 
                        <Form.Control.Feedback type="invalid">
                            {errors?.password?.message}
                        </Form.Control.Feedback>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Enter confirm password"
                        defaultValue=""
                        {...register("confirmPassword")}
                        isInvalid={!!errors.password}
                    />
                    {
                        errors?.password?.message && 
                        <Form.Control.Feedback type="invalid">
                            {errors?.password?.message}
                        </Form.Control.Feedback>
                    }
                </Form.Group>

                    

                    <Button variant="primary" type="submit" disabled={isSubmitting ? true : false}>
                        Reset
                    </Button>
                   
                </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ResetPassword;