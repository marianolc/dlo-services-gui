import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { createLoadingSelector } from '../../apis/selectors';
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import { customer, updateCustomer, deleteCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import { formContainerStyles } from '../shared/Styles';

class CustomerUpdate extends React.Component {

  componentDidMount() {
    this.props.customer(this.props.match.params.id);
  }

  submitData = (data) => {
    this.props.updateCustomer(this.props.match.params.id, data);
  };

  deleteActual = (data) => {
    this.props.deleteCustomer(data.id);
  };

  render() {
    const initialValues = this.props.data === null ?
      null :
      _.pick(this.props.data,
        "referenceId", "name", "address1", "address2", "phone", "phone2", "email");
    return (
      <FormContainer
        isUpdate
        title={"Customer"}
        error={this.props.error}
        urlBuilder={this.urlBuilder}
        content={CustomerForm}
        onSubmit={this.submitData}
        onDelete={this.deleteActual}
        initialValues={initialValues}
        isFetching={this.props.isFetching}
      />
    );
  }
}

const loadingSelector = createLoadingSelector(['VIEW']);
const mapStateToProps = ({ viewData, loading }) => {
  return {
    data: viewData.data,
    error: viewData.error,
    isFetching: loadingSelector(loading)
  };
};

const componentWithStyle = withStyles(formContainerStyles)(CustomerUpdate);

export default connect(mapStateToProps, { customer, updateCustomer, deleteCustomer })(componentWithStyle);
