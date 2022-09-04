import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../context/Auth.context";

const schema = yup
  .object({
    email: yup.string().trim().required("Email is required").lowercase(),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // login user
    login({
      identifier: data.email,
      password: data.password,
    });
  };

  return (
    <div>
      <h2 className="text-center mb-3">Login</h2>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue="web.kawsarahmed@gmail.com"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              {errors?.email?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter password"
                defaultValue="123456@Ka"
                {...register("password")}
                isInvalid={!!errors.password}
              />
              {errors?.password?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              Log In
            </Button>
            <p className="mt-3">
              Forgot password ? <Link to="/forgot-password">click here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
