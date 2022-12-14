import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import avatarImg from "../assets/avatar-img.jpg";
import { AuthContext } from "../context/Auth.context";
import { UserContext } from "../context/User.context";

const schema = yup
  .object({
    firstName: yup.string().min(3, "First name at least 3 character"),
    lastName: yup.string().min(3, "Last name at least 3 character"),
    profilePicture: yup.mixed().required("Profile picture is required"),
  })
  .required();

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const {
    loaded,
    userProfile,
    createUserProfile,
    loadUserProfile,
    updateUserProfile,
  } = useContext(UserContext);

  const [showUploadSection, setShowUploadSection] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [disabledForm, setDiasbledForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(user, "user");
  const onSubmit = async (data) => {
    console.log(userProfile, "userProfile in onsubmit");
    if (userProfile) {
      updateUserProfile(data);
    } else {
      createUserProfile(data);
    }
  };

  useEffect(() => {
    loadUserProfile();
    console.log(userProfile, "userProfile in useEffect");
  }, []);

  return (
    <div>
      <Row>
        <Col xl="12">
          {/* {userProfile && (
            <>
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  className="contact_image"
                  src={userProfile?.profilePicture?.formats?.large?.url}
                  alt="Profile Picture Image"
                />

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Username: {userProfile?.user?.username}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Name: {userProfile?.firstName} {userProfile?.lastName}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Email: {userProfile?.user?.email}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )} */}

          {
            <div className="d-flex flex-column justify-content-center">
              {percentage > 0 && (
                <ProgressBar
                  animated
                  now={percentage}
                  label={`${percentage}%`}
                />
              )}

              <p style={{ fontSize: "25px" }}>
                Personal Information{" "}
                <span
                  onClick={() => setDiasbledForm(false)}
                  style={{
                    fontSize: "17px",
                    color: "#03A4E0",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  {userProfile
                    ? "Change personal information"
                    : "Add personal information"}
                </span>
              </p>

              <img
                style={{
                  maxWidth: "200px",
                  borderRadius: "50%",
                  display: "block",
                }}
                src={
                  userProfile?.profilePicture?.formats?.large?.url
                    ? userProfile?.profilePicture?.formats?.large?.url
                    : avatarImg
                }
                alt="Profile Avatar Image"
              />

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="firstName"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    {...register("firstName")}
                    defaultValue={
                      userProfile?.firstName
                        ? userProfile?.firstName
                        : "*******"
                    }
                    disabled={disabledForm ? true : false}
                  />

                  {errors?.firstName?.message && (
                    <Form.Text className="text-danger">
                      {errors?.firstName?.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="lastName"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    {...register("lastName")}
                    defaultValue={
                      userProfile?.lastName ? userProfile?.lastName : "*******"
                    }
                    disabled={disabledForm ? true : false}
                  />

                  {errors?.lastName?.message && (
                    <Form.Text className="text-danger">
                      {errors?.lastName?.message}
                    </Form.Text>
                  )}
                </Form.Group>

                {!disabledForm && (
                  <Form.Group
                    className="mb-3"
                    as={Col}
                    md={6}
                    controlId="profilePicture"
                  >
                    <Form.Label>Profile picture</Form.Label>

                    <Form.Control
                      type="file"
                      {...register("profilePicture")}
                      accept="image/*"
                    />

                    {errors?.profilePicture?.message && (
                      <Form.Text className="text-danger">
                        {errors?.profilePicture?.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                {!disabledForm && (
                  <Button type="submit" disabled={isSubmitting ? true : false}>
                    Save
                  </Button>
                )}
              </Form>
            </div>
          }
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
