import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import { getCustomer, updateCustomer, deleteCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from "../shared/Translated";

const CustomerUpdate = (props) => {
  const dispatch = useDispatch();
  const { customer } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(getCustomer(props.match.params.id));
  }, []);
  return (
    <FormContainer
      isUpdate
      title={translated("customer.title.singular")}
      content={CustomerForm}
      onSubmit={(data) => dispatch(updateCustomer(props.match.params.id, data))}
      onDelete={(data) => dispatch(deleteCustomer(props.match.params.id, data))}
      initialValues={customer}
    />
  );
};

export default CustomerUpdate;
