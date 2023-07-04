import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteUserContactMutation,
  useGetUserContactsQuery,
} from "../features/profiles/profilesAPI";

const UserContacts = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserContactsQuery();
  const [
    deleteUserContact,
    {
      isSuccess: deleteContactIsSuccess,
      isError: deleteContactIsError,
      error: deleteContactError,
    },
  ] = useDeleteUserContactMutation();

  const handleDelete = (id) => {
    deleteUserContact(id);
  };

  useEffect(() => {
    if (deleteContactIsError) {
      toast.error(
        deleteContactError?.data?.error?.message ?? "Something went wrong!"
      );
    }

    if (deleteContactIsSuccess) {
      toast.success("Contact deleted successfully!");
    }
  }, [deleteContactIsError, deleteContactIsSuccess]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>{error?.data?.error?.message ?? "Something went wrong!"}</div>;
  }

  if (isSuccess && data?.contacts?.length === 0) {
    content = (
      <Card body className="text-center">
        Your contacts not found!
      </Card>
    );
  }

  if (isSuccess && data?.contacts?.length) {
    content = (
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profession</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.contacts.map((contact) => {
            return (
              <tr key={contact?.id} className="text-center">
                <td>{contact?.id}</td>
                <td>{contact?.firstName}</td>
                <td>{contact?.lastName}</td>
                <td>{contact?.email}</td>
                <td>{contact?.profession}</td>
                <td>{contact?.gender}</td>
                <td>
                  <Link to={`/edit/contacts/${contact.id}`}>
                    <FaPen />
                  </Link>
                </td>
                <td>
                  <FaTrashAlt
                    onClick={() => handleDelete(contact?.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  return <div>{content}</div>;
};

export default UserContacts;
