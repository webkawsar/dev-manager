import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { ContactContext } from "../context/Contact.context";
import { UserContext } from "../context/User.context";

const UserContacts = () => {
  const { loaded, userContacts, loadUserProfile } = useContext(UserContext);
  const { deleteContact } = useContext(ContactContext);

  const handleDelete = (id) => {
    deleteContact(id);
  };

  useEffect(() => {
    // console.log(userContacts, "userContacts");
    loadUserProfile();
  }, []);

  return (
    <div>
      {loaded ? (
        userContacts.length ? (
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userContacts.map((contact) => {
                return (
                  <tr key={contact?.id} className="text-center">
                    <td>{contact?.id}</td>
                    <td>{contact?.firstName}</td>
                    <td>{contact?.lastName}</td>
                    <td>{contact?.email}</td>
                    <td>{contact?.profession}</td>
                    <td>
                      <Link to={`/edit/contacts/${contact.id}`}>
                        <FaEye />
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
        ) : (
          <h2 style={{ color: "red", textAlign: "center" }}>
            No Contacts to show
          </h2>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserContacts;
