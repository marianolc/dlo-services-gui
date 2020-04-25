import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import { getAccount, updateAccount, deleteAccount } from "../../actions";
import AccountForm from "./AccountForm";
import translated from "../shared/Translated";

const AccountUpdate = (props) => {
  const dispatch = useDispatch();
  const { account } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(getAccount(props.match.params.id));
  }, []);
  return (
    <FormContainer
      isUpdate
      title={translated("account.title.singular")}
      content={AccountForm}
      onSubmit={(data) => dispatch(updateAccount(props.match.params.id, data))}
      onDelete={(data) => dispatch(deleteAccount(props.match.params.id, data))}
      initialValues={account}
    />
  );
};

export default AccountUpdate;
