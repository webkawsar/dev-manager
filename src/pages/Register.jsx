import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthContext } from "../context/Auth.context";

const schema = yup
  .object({
    username: yup
      .string()
      .trim()
      .required("Username is required")
      .min(3, "Username must be at least 3 character"),
    email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
    confirm_password: yup
      .string()
      .trim()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Confirm password don't match"),
  })
  .required();

const defaultValues = {
  username: "webkawsar",
  email: "web.kawsarahmed@gmail.com",
  password: "123456@Ka",
  confirmPassword: "123456@Ka",
};

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerUser({
      username: data.username,
      password: data.password,
      email: data.email,
    });
  };

  const { username, email, password, confirmPassword } = defaultValues;
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
                defaultValue={username}
                {...register("username")}
                isInvalid={!!errors.username}
              />
              {errors?.username?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.username?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={email}
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
                defaultValue={password}
                {...register("password")}
                isInvalid={!!errors.password}
              />
              {errors?.password?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                defaultValue={confirmPassword}
                {...register("confirm_password")}
                isInvalid={!!errors.confirm_password}
              />

              {errors?.confirm_password?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.confirm_password?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
