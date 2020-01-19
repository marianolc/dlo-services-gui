import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import ViewContainer from "../shared/ViewContainer";
import { customer, deleteCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import { formContainerStyles } from '../shared/Styles';

class Customer extends React.Component {

  componentDidMount() {
    this.showValues();
  }

  showValues() {
    this.props.customer(this.props.match.params.id);
  }

  deleteActual = (data) => {
    this.props.deleteCustomer(data.id);
  };

  render() {
    return (
      <ViewContainer
        isView
        title={"Customer"}
        error={this.props.error}
        content={CustomerForm}
        onDelete={this.deleteActual}
        values={this.props.data}
        onRefresh={() => this.showValues()}
      />
    );
  }
}

const mapStateToProps = ({ viewData }) => {
  return {
    data: viewData.data,
    error: viewData.error
  };
};

const componentWithStyle = withStyles(formContainerStyles)(Customer);

export default connect(mapStateToProps, { customer, deleteCustomer })(componentWithStyle);
