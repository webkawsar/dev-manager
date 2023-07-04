import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useChangePasswordMutation } from "../features/auth/authAPI";

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .trim()
      .required("Current password is required"),
    newPassword: yup
      .string()
      .trim()
      .required("New password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm new password is required")
      .oneOf([yup.ref("newPassword")], "Confirm new password don't match"),
  })
  .required();

const ManagePassword = (props) => {
  const [changePassword, { data, isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    changePassword({
      currentPassword: data.currentPassword,
      password: data.newPassword,
      passwordConfirmation: data.confirmPassword,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      toast.success("Password changed successfully");
      navigate("/dashboard/profile");
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12" xl={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter current password"
                defaultValue=""
                {...register("currentPassword")}
                isInvalid={!!errors.currentPassword}
              />
              {errors?.currentPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.currentPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter new password"
                defaultValue=""
                {...register("newPassword")}
                isInvalid={!!errors.newPassword}
              />
              {errors?.newPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.newPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm new password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter confirm new password"
                defaultValue=""
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
              />
              {errors?.confirmPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.confirmPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ManagePassword;
