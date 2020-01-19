import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormContainer from "../shared/FormContainer";
import { createCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import { formContainerStyles } from '../shared/Styles';

class CustomerCreate extends React.Component {

  submitData = (data) => {
    this.props.createCustomer(data);
  };

  render() {
    return (
      <FormContainer
        read={this.props.read}
        title={"Customer"}
        error={this.props.error}
        content={CustomerForm}
        onSubmit={this.submitData}
        initialValues={{}}
      />
    );
  }
}

const mapStateToProps = ({ viewData }) =>
  ({
    error: viewData.error
  });

const componentWithStyle = withStyles(formContainerStyles)(CustomerCreate);

export default connect(mapStateToProps, { createCustomer })(componentWithStyle);
