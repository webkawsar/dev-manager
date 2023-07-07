import React, { useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Contact from "../components/contacts/Contact";
import { changePage } from "../features/contacts/contactSlice";
import { useGetContactsQuery } from "../features/contacts/contactsAPI";
import ContactsLoader from "../ui/ContactsLoader";
import { formateContact } from "../utils/formateContact";

const generateArr = (num) => {
  const nums = [];
  for (let i = 1; i <= num; i++) {
    nums.push(i);
  }
  return nums;
};

const Contacts = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError, error } =
    useGetContactsQuery(page);
  const dispatch = useDispatch();


  const handlePage = (count) => {
    setPage(count);
    dispatch(changePage(count));
  }

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <Row className="g-3">
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
        <ContactsLoader />
      </Row>
    );
  }

  if (isError) {
    toast.error(error?.data?.error?.message ?? "Something went wrong!");
  }

  if (isSuccess && data?.data?.length === 0) {
    content = (
      <Row className="g-3">
        <Col sm>
          <Card body className="text-center">
            Contacts not found!
          </Card>
        </Col>
      </Row>
    );
  }

  if (isSuccess && data?.data?.length) {
    const paginationArr = generateArr(data?.meta?.pagination?.pageCount || 1);
    content = (
      <>
        <Row className="g-3">
          {data.data.map((contact) => (
            <Contact key={contact.id} contact={formateContact(contact)} />
          ))}
        </Row>
        <div className="mt-5">
          <Pagination className="justify-content-center">
            {paginationArr.map((count) => {
              return (
                <Pagination.Item
                  key={count}
                  active={count === data?.meta?.pagination?.page}
                  onClick={() => handlePage(count)}
                >
                  {count}{" "}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-center mb-5">All Contacts</h2>
      {content}
    </>
  );
};

export default Contacts;
