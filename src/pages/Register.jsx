import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required(),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data, "data");
  };
  console.log(errors, "errors");

  return (
    <div>
      <h1 className="text-center mb-3">Register</h1>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your username"
                defaultValue=""
                {...register("username")}
                isInvalid={!!errors.username}
              />
              {
                errors?.username?.message && 
                <Form.Control.Feedback type="invalid">
                    {errors?.username?.message}
                </Form.Control.Feedback>
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue=""
                {...register("email")}
                isInvalid={!!errors.email}
              />
              {
                errors?.email?.message && 
                <Form.Control.Feedback type="invalid">
                    {errors?.email?.message}
                </Form.Control.Feedback>
              }
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                defaultValue=""
                {...register("confirmPassword")}
                isInvalid={!!errors.confirm_password}
              />
              
              {
                errors?.confirm_password?.message && 
                <Form.Control.Feedback type="invalid">
                    {errors?.confirm_password?.message}
                </Form.Control.Feedback>
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
