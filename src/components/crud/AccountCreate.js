import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import FormContainer from "../shared/FormContainer";
import { createAccount } from "../../actions";
import AccountForm from "./AccountForm";
import { formContainerStyles } from '../shared/Styles';
import translated from '../shared/Translated';

const AccountCreate = (props) => {
  const dispatch = useDispatch();
  return (
    <FormContainer
      title={translated('account.title.singular')}
      content={AccountForm}
      onSubmit={(d) => dispatch(createAccount(d))}
      initialValues={{
        customerId: props.match.params.parentId
      }}
    />
  );
};

export default AccountCreate;
