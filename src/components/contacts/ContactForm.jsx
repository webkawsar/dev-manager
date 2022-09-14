import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ContactContext } from "../../context/Contact.context";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is Required")
      .min(3, "First name at least 3 character"),
    lastName: yup
      .string()
      .required("Last name is Required")
      .min(3, "Last name at least 3 character"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Must be a valid email"),
    profession: yup
      .string()
      .required("Profession is required")
      .oneOf(["designer", "developer", "marketer"]),
    bio: yup
      .string()
      .required("BIO is required")
      .min(10, "Write your BIO at least 10 character")
      .max(100, "BIO must be less than 100 character"),
    gender: yup.mixed().oneOf(["male", "female"]),
    image: yup.mixed().required("Image is required"),
  })
  .required();

const ContactForm = ({ contact }) => {
  const { addContact, updateContact } = useContext(ContactContext);

  const defaultValue = {
    firstName: contact?.firstName || "Kawsar",
    lastName: contact?.lastName || "Ahmed",
    email: contact?.email || "web.kawsarahmed@gmail.com",
    profession: contact?.profession || "developer",
    bio: contact?.bio || "Hi, This is Kawsar Ahmed",
    gender: contact?.gender || "male",
    dob: (contact?.dob && new Date(contact?.dob)) || new Date(),
  };

  const { firstName, lastName, email, profession, image, bio, gender, dob } =
    defaultValue;

  const [birthDate, setBirthDate] = useState(dob ? dob : new Date());
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const id = contact?.id;
    if (id) {
      // update contact
      updateContact(data, id);
    } else {
      // console.log(data, "data");
      // adding contact
      addContact(data);
    }
  };

  console.log(errors, "errors");

  useEffect(() => {
    setValue("dob", birthDate);
  }, [birthDate]);

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       profession: "",
  //       image: "",
  //       bio: "",
  //       gender: "",
  //     });

  //     setBirthDate(new Date());
  //   }
  // }, [isSubmitSuccessful]);

  return (
    <div>
      <h2 className="text-center">
        {contact?.id ? "Edit Contact" : "Add Contact"}
      </h2>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              {...register("firstName")}
              defaultValue={firstName}
            />

            {errors?.firstName?.message && (
              <Form.Text className="text-danger">
                {errors?.firstName?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              defaultValue={lastName}
            />

            {errors?.lastName?.message && (
              <Form.Text className="text-danger">
                {errors?.lastName?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              {...register("email")}
              defaultValue={email}
            />

            {errors?.email?.message && (
              <Form.Text className="text-danger">
                {errors?.email?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
            <Form.Label>Profession</Form.Label>

            <Form.Select {...register("profession")} defaultValue={profession}>
              <option value="">Select your profession</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="marketer">Marketer</option>
            </Form.Select>

            {errors?.profession?.message && (
              <Form.Text className="text-danger">
                {errors?.profession?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="Image">
            <Form.Label>Image</Form.Label>

            <Form.Control type="file" {...register("image")} accept="image/*" />

            {errors?.image?.message && (
              <Form.Text className="text-danger">
                {errors?.image?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <ReactDatePicker
              className="form-control"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              maxDate={new Date()}
              showYearDropdown
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="bio">
            <Form.Label>BIO</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your bio"
              {...register("bio")}
              defaultValue={bio}
            />

            {errors?.bio?.message && (
              <Form.Text className="text-danger">
                {errors?.bio?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
            <Form.Check
              type="radio"
              inline
              label="Male"
              id="male"
              value="male"
              {...register("gender")}
              defaultChecked={gender === "male"}
            />
            <Form.Check
              type="radio"
              inline
              label="Female"
              id="female"
              value="female"
              {...register("gender")}
              defaultChecked={gender === "female"}
            />

            {errors?.gender?.message && (
              <Form.Text className="text-danger">
                {errors?.gender?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Agreed to Dev Manager terms & conditions" name="agreedPolicy" />
                </Form.Group> */}

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting ? "disabled" : ""}
        >
          {contact?.id ? "Update Contact" : "Add Contact"}
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
