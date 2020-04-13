import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import { customer, updateCustomer, deleteCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import { formContainerStyles } from "../shared/Styles";
import translated from "../shared/Translated";

const CustomerUpdate = (props) => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(customer(props.match.params.id));
  }, []);
  return (
    <FormContainer
      isUpdate
      title={translated("customer.title.singular")}
      error={error}
      content={CustomerForm}
      onSubmit={(data) => dispatch(updateCustomer(props.match.params.id, data))}
      onDelete={(data) => dispatch(deleteCustomer(props.match.params.id, data))}
      initialValues={data}
    />
  );
};

export default CustomerUpdate;
