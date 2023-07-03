import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Playground = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
  };

  useEffect(() => {
    // Simulate fetching data from the database
    const fetchDataFromDatabase = () => {

      const { field1, field2, field3 } = {
        field1: 'Kawsar',
        field2: 'Ahmed',
        field3: 'Developer'
      };

      // Update the default values of the input fields using the 'reset' function
      reset({
        inputField1: field1,
        inputField2: field2,
        inputField3: field3,
      });
    };

    fetchDataFromDatabase();
  }, []);

  // console.log(updatedLastName, 'updatedLastName')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('inputField1')} defaultValue="Imran" />
    <input {...register('inputField2')} defaultValue="Khan" />
    <input {...register('inputField3')} defaultValue="Pilot" />
    <button type="submit">Submit</button>
  </form>
  );
};

export default Playground;
