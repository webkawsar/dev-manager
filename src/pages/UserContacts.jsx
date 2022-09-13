import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { AuthContext } from "../context/Auth.context";
import { ContactContext } from "../context/Contact.context";

const UserContacts = () => {
  const { userContacts, loaded, setTriggerDelete } = useContext(AuthContext);
  const { deleteContact } = useContext(ContactContext);

  const handleDelete = (id) => {
    deleteContact(id);
    setTriggerDelete((prevState) => !prevState);
  };

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
