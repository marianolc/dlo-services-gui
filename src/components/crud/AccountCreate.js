import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormContainer from "../shared/FormContainer";
import { createAccount } from "../../actions";
import AccountForm from "./AccountForm";
import { formContainerStyles } from '../shared/Styles';
import translated from '../shared/Translated';

class AccountCreate extends React.Component {

  submitData = (data) => {
    data.customerId = this.props.match.params.parentId;
    this.props.createAccount(data);
  };

  render() {
    return (
      <FormContainer
        read={this.props.read}
        title={translated('account.title.singular')}
        error={this.props.error}
        content={AccountForm}
        onSubmit={(d) => this.submitData(d)}
        initialValues={{}}
      />
    );
  }
}

const mapStateToProps = ({ viewData }) =>
  ({
    error: viewData.error
  });

const componentWithStyle = withStyles(formContainerStyles)(AccountCreate);

export default connect(mapStateToProps, { createAccount })(componentWithStyle);
