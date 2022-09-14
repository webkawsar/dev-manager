import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import avatarImg from "../assets/avatar-img.jpg";
import { axiosPrivateInstance } from "../config/axios";
import { AuthContext } from "../context/Auth.context";

const schema = yup
  .object({
    firstName: yup.string().min(3, "First name at least 3 character"),
    lastName: yup.string().min(3, "Last name at least 3 character"),
    profilePicture: yup.mixed().required("Profile picture is required"),
  })
  .required();

const Profile = () => {
  const { user, token, loadUserProfile } = useContext(AuthContext);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [disabledForm, setDiasbledForm] = useState(true);

  const uploadPercentage = (total, loaded) => {
    return Math.floor((loaded / total) * 100);
  };

  // const handleChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     firstName: "Imran",
  //     lastName: "Ahmed",
  //     user: user.id,
  //   };
  //   // form data
  //   const formData = new FormData();
  //   formData.append("files.profilePicture", file, file.name);
  //   formData.append("data", JSON.stringify(data));

  //   // upload file to the server
  //   try {
  //     setSubmitting(true);
  //     const response = await axiosPrivateInstance(token).post(
  //       "/profiles?populate=*",
  //       formData,
  //       {
  //         onUploadProgress: (progress) => {
  //           const percentage = uploadPercentage(
  //             progress.total,
  //             progress.loaded
  //           );
  //           setPercentage(percentage);
  //         },
  //       }
  //     );
  //     console.log(response.data, "upload response");
  //     setSubmitting(false);
  //   } catch (error) {
  //     console.log(error, "upload error");
  //   }
  // };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(user, "user");
  const onSubmit = async (data) => {
    const { profilePicture, ...restData } = data;
    const formData = new FormData();
    formData.append(
      "profilePicture",
      profilePicture[0],
      profilePicture[0]?.name
    );
    formData.append("data", JSON.stringify(restData));

    // upload file to the server
    try {
      setSubmitting(true);
      const response = await axiosPrivateInstance(token).post(
        "/profiles",
        formData,
        {
          onUploadProgress: (progress) => {
            const percentage = uploadPercentage(
              progress.total,
              progress.loaded
            );
            setPercentage(percentage);
          },
        }
      );
      setSubmitting(false);
      console.log(response.data, "upload response");
    } catch (error) {
      console.log(error, "upload error");
    }
  };

  useEffect(() => {
    // loadUserProfile();
    console.log(user, "user in profile");
  }, []);

  return (
    <div>
      <Row>
        {/* <Col xl={{ span: 8, offset: 2 }}>
          <Card style={{ width: "30rem" }}>
            <Card.Img
              className="contact_image"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22731%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20731%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1828580aaac%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A37pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1828580aaac%22%3E%3Crect%20width%3D%22731%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22274.3984375%22%20y%3D%22109.5%22%3E731x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            />

            <Card.Body>
              <Card.Title>
                {"John"} {"Doe"}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"Software Kamla"}
              </Card.Subtitle>
              <Card.Text>{"Mara gese ei line e ase"}</Card.Text>
            </Card.Body>

            <ListGroup variant="flush">
              <ListGroup.Item>Email: {"john@gmail.com"}</ListGroup.Item>
              <ListGroup.Item>Gender: {"Male"}</ListGroup.Item>
              <ListGroup.Item>
                Date of Birth: {"Jonmer tarik jana nai"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col> */}

        {/* <Col xl="12">
          <br />
          <hr />
          

          <p style={{ fontSize: "25px" }}>
            Profile Picture{" "}
            <span
              onClick={() => setShowUploadSection(true)}
              style={{
                fontSize: "17px",
                color: "#03A4E0",
                marginLeft: "25px",
                cursor: "pointer",
              }}
            >
              {" "}
              Change Profile Picture
            </span>
          </p>
          <span>(PNG/JPG/JPEG/BMP, Max. 3MB)</span>

          <h6 className="mt-3 mb-3">Your Profile Photo</h6>
          <Form onSubmit={handleSubmit}>
            <img
              style={{
                maxWidth: "200px",
                borderRadius: "50%",
                marginRight: "30px",
              }}
              src={avatarImg}
              alt=""
            />

            {percentage > 0 && (
              <ProgressBar animated now={percentage} label={`${percentage}%`} />
            )}

            {showUploadSection && (
              <>
                <input
                  onChange={handleChange}
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/*"
                />
                <br />
                <Button
                  type="submit"
                  className="mt-5"
                  disabled={submitting ? true : false}
                >
                  Save
                </Button>
              </>
            )}
          </Form>
        </Col> */}

        <Col xl="12">
          {user.isProfile ? (
            <>
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  className="contact_image"
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22731%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20731%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1828580aaac%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A37pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1828580aaac%22%3E%3Crect%20width%3D%22731%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22274.3984375%22%20y%3D%22109.5%22%3E731x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                />

                <Card.Body>
                  <Card.Title>
                    {"John"} {"Doe"}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {"Software Kamla"}
                  </Card.Subtitle>
                  <Card.Text>{"Mara gese ei line e ase"}</Card.Text>
                </Card.Body>

                <ListGroup variant="flush">
                  <ListGroup.Item>Email: {"john@gmail.com"}</ListGroup.Item>
                  <ListGroup.Item>Gender: {"Male"}</ListGroup.Item>
                  <ListGroup.Item>
                    Date of Birth: {"Jonmer tarik jana nai"}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center">
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
                  Add your personal information
                </span>
              </p>

              <img
                style={{
                  maxWidth: "200px",
                  borderRadius: "50%",
                }}
                src={avatarImg}
                alt="Profile Avatar Image"
              />

              {percentage > 0 && (
                <ProgressBar
                  animated
                  now={percentage}
                  label={`${percentage}%`}
                />
              )}

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
                    defaultValue="*******"
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
                    defaultValue="*******"
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
                    controlId="Image"
                  >
                    <Form.Label>Image</Form.Label>

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

                {!disabledForm && <Button type="submit">Save</Button>}
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
