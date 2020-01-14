import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { createLoadingSelector } from '../../apis/selectors';

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
        urlBuilder={this.urlBuilder}
        content={CustomerForm}
        onSubmit={this.submitData}
        initialValues={{}}
        isFetching={this.props.isFetching}
      />
    );
  }
}

const loadingSelector = createLoadingSelector(['VIEW']);
const mapStateToProps = ({ viewData, loading }) =>
  ({
    error: viewData.error,
    isFetching: loadingSelector(loading)
  });

const componentWithStyle = withStyles(formContainerStyles)(CustomerCreate);

export default connect(mapStateToProps, { createCustomer })(componentWithStyle);
