import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Playground = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select an option:</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Option 1"
            name="options"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
          />
          <Form.Check
            type="radio"
            label="Option 2"
            name="options"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
          />
          <Form.Check
            type="radio"
            label="Option 3"
            name="options"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={handleOptionChange}
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default Playground;
