import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import avatarImg from "../assets/avatar-img.jpg";
import {
  useCreateUserProfileMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../features/profiles/profilesAPI";
import formatImageUrl from "../utils/formatImageUrl";

const schema = yup
  .object({
    firstName: yup.string().min(3, "First name at least 3 character"),
    lastName: yup.string().min(3, "Last name at least 3 character"),
    profilePicture: yup.mixed().required("Profile picture is required"),
  })
  .required();

const Profile = () => {
  const [file, setFile] = useState(null);
  const [disabledForm, setDisabledForm] = useState(true);

  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    isSuccess: userProfileIsSuccess,
    isError: userProfileIsError,
    error: userProfileError,
    refetch,
  } = useGetUserProfileQuery();

  const [createUserProfile, { data, isLoading, isSuccess, isError, error }] =
    useCreateUserProfileMutation();

  const [
    updateUserProfile,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (userProfileIsSuccess && userProfile?.profile?.id) {
      updateUserProfile({ id: userProfile?.profile?.id, data });
    } else {
      createUserProfile(data);
    }
  };

  // fetch again data after create or update
  useEffect(() => {
    if (isSuccess || updateIsSuccess) {
      refetch();
    }
  }, [isSuccess, updateIsSuccess]);

  // load user profile side effects
  useEffect(() => {
    if (userProfileIsSuccess && userProfile?.profile) {
      const { firstName, lastName } = userProfile?.profile;
      reset({
        firstName,
        lastName,
      });
    }

  }, [userProfileIsSuccess, reset]);

  // create side effects
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      setDisabledForm(true);
      toast.success("Profile added successfully");
    }
  }, [isError, isSuccess]);

  // update side effects
  useEffect(() => {
    if (updateIsError) {
      toast.error(updateError?.data?.error?.message ?? "Something went wrong!");
    }

    if (updateIsSuccess) {
      setDisabledForm(true);
      toast.success("Profile updated successfully");
    }
  }, [updateIsError, updateIsSuccess]);

  // decide what to render
  let content = null;
  if (userProfileIsLoading) {
    content = <div style={{textAlign: 'center'}}>
      <h2>Loading...</h2>
    </div>
  }

  if (userProfileIsError) {
    content = (
      <div style={{textAlign: 'center'}}> 
        <h2>{userProfileError?.data?.error?.message ??
          "Something went wrong!"}</h2>
      </div>
    );
  }

  if (userProfileIsSuccess) {
    content = (
      <Row>
        <Col xl="12">
          {
            <div className="d-flex flex-column justify-content-center">
              <p style={{ fontSize: "25px" }}>
                Personal Information{" "}
                <span
                  onClick={() => setDisabledForm(false)}
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
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  display: "block",
                }}
                src={
                  formatImageUrl(userProfile?.profile?.profilePicture)
                    ? formatImageUrl(userProfile?.profile?.profilePicture)
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
                    defaultValue="******"
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
                    defaultValue="******"
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
                    {userProfileIsSuccess && userProfile?.profile?.id ? 'Update' : 'Save'}
                  </Button>
                )}
              </Form>
            </div>
          }
        </Col>
      </Row>
    );
  }

  return <div>{content}</div>;
};

export default Profile;
