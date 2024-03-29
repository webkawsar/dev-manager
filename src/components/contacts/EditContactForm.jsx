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
      .required("First name is required")
      .min(3, "First name at least 3 character"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name at least 3 character"),
    email: yup
      .string()
      .required("Email is required")
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
    image: yup.mixed(),
  })
  .required();

const EditContactForm = ({ contact }) => {
  const { addContact, updateContact } = useContext(ContactContext);

  const defaultValue = {
    firstName: contact?.firstName,
    lastName: contact?.lastName,
    email: contact?.email,
    profession: contact?.profession,
    bio: contact?.bio,
    gender: contact?.gender,
    dob: contact?.dob && new Date(contact?.dob),
  };

  const { firstName, lastName, email, profession, image, bio, gender, dob } =
    defaultValue;

  const [birthDate, setBirthDate] = useState(dob);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    updateContact({ ...data, imageId: contact?.image?.data?.id }, contact?.id);
  };

  useEffect(() => {
    setValue("dob", birthDate);
  }, [birthDate]);

  return (
    <div>
      <h2 className="text-center">Edit Contact</h2>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              defaultValue={firstName}
              isInvalid={errors?.firstName?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              defaultValue={lastName}
              isInvalid={errors?.lastName?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              {...register("email")}
              defaultValue={email}
              isInvalid={errors?.email?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
            <Form.Label>Profession</Form.Label>

            <Form.Select
              {...register("profession")}
              defaultValue={profession}
              isInvalid={errors?.profession?.message}
            >
              <option value="">Select your profession</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="marketer">Marketer</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="Image">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              {...register("image")}
              accept="image/*"
              required
              isInvalid={errors?.image?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.image?.message}
            </Form.Control.Feedback>
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
              isInvalid={errors?.bio?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
            <Form.Label className="d-block mb-3">Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              id="male"
              value="male"
              {...register("gender")}
              defaultChecked={gender === "male"}
              isInvalid={errors?.gender?.message}
            />
            <Form.Check
              type="radio"
              label="Female"
              id="female"
              value="female"
              {...register("gender")}
              defaultChecked={gender === "female"}
              isInvalid={errors?.gender?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.gender?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={isSubmitSuccessful}>
          Update Contact
        </Button>
      </Form>
    </div>
  );
};

export default EditContactForm;
