import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import { account, updateAccount, deleteAccount } from "../../actions";
import AccountForm from "./AccountForm";
import { formContainerStyles } from "../shared/Styles";
import translated from "../shared/Translated";

class AccountUpdate extends React.Component {
  componentDidMount() {
    this.props.account(this.props.match.params.id);
  }

  submitData = (data) => {
    this.props.updateAccount(this.props.match.params.id, data);
  };

  deleteActual = (data) => {
    this.props.deleteAccount(data.id);
  };

  render() {
    const initialValues =
      this.props.data === null
        ? null
        : _.pick(this.props.data, "referenceId", "name");
    return (
      <FormContainer
        isUpdate
        title={translated("account.title.singular")}
        error={this.props.error}
        content={AccountForm}
        onSubmit={this.submitData}
        onDelete={this.deleteActual}
        initialValues={initialValues}
      />
    );
  }
}

const mapStateToProps = ({ crudData }) => {
  return {
    data: crudData.data,
    error: crudData.error,
  };
};

const componentWithStyle = withStyles(formContainerStyles)(AccountUpdate);

export default connect(mapStateToProps, {
  account,
  updateAccount,
  deleteAccount,
})(componentWithStyle);
