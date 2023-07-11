import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useRegisterMutation } from "../features/auth/authAPI";

const schema = yup
  .object({
    fullName: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 character"),
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
  fullName: "Kawsar Ahmed",
  email: "web.kawsarahmed@gmail.com",
  password: "123456",
  confirmPassword: "123456",
};

const Register = () => {
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    registerUser({
      username: uuidv4(),
      fullName: data.fullName,
      password: data.password,
      email: data.email,
    });
  };

  useEffect(() => {
    
    if (isError) {
      // show error message
      toast.error(error?.data?.error?.message ?? 'Something went wrong!');
    }

    if (isSuccess) {
      // show success msg
      toast.success("Confirm your account by clicking the email link");
      navigate('/');
    }
  }, [isError, isSuccess]);

  const { fullName, email, password, confirmPassword } = defaultValues;
  return (
    <div>
      <h1 className="text-center mb-3">Register</h1>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Full name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your full name"
                defaultValue={fullName}
                {...register("fullName")}
                isInvalid={!!errors.fullName}
              />
              {errors?.fullName?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.fullName?.message}
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

            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
