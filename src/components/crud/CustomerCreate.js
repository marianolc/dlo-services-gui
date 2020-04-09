import React from "react";
import { useDispatch } from "react-redux";
import FormContainer from "../shared/FormContainer";
import { createCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from '../shared/Translated';

const CustomerCreate = () => {
  const dispatch = useDispatch();

  return (
    <FormContainer
      title={translated('customer.title.singular')}
      content={CustomerForm}
      onSubmit={(d) => dispatch(createCustomer(d))}
      initialValues={{}}
    />
  );
}

export default CustomerCreate;