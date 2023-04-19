import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        className="d-block mx-auto my-auto mt-3"
        animation="grow"
        size="xxl"
      />
    </>
  );
};

export default Loader;
