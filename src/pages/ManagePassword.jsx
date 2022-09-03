import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    oldPassword: yup.string().trim().required("Old password is required"),
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const onSubmit = async (data) => {
    // try {
    //   const response = await axiosInstance.post("/auth/reset-password", {
    //     code,
    //     password: data.password,
    //     passwordConfirmation: data.confirmPassword,
    //   });

    //   console.log(response, "response");
    //   toast.success(
    //     "Password reset successfully, please login with new password"
    //   );

    //   navigate("/login");
    // } catch (error) {
    //   console.log(error.response);
    //   toast.error("Issue in resetting password please try again!");
    // }

    console.log(data, "data");
  };

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12" xl={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter old password"
                defaultValue=""
                {...register("oldPassword")}
                isInvalid={!!errors.oldPassword}
              />
              {errors?.oldPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.oldPassword?.message}
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
              disabled={isSubmitting ? true : false}
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
