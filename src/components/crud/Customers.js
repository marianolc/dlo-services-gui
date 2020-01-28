import React from "react";
import { connect } from "react-redux";

import { customers, customersFiltered, deleteCustomer } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from '../shared/Translated';

class Customers extends React.Component {

  state = {
    data: null,
    filters: {
    }
  }

  loadData() {
    this.props.customersFiltered(this.state.filters);
  }

  deleteSelected(data) {
    this.props.deleteCustomer(data.id);
  }

  doFilter(data) {
    this.setState({ filters: data })
    this.props.customersFiltered(data);
  }

  render() {
    return (
      <TableContainer
        title={translated('customer.title')}
        data={this.props.data}
        error={this.props.error}
        onLoad={() => this.loadData()}
        createView={"create-customer"}
        updateView={"update-customer"}
        readView={"customer"}
        onDelete={(d) => this.deleteSelected(d)}
        idBuilder={r => r.id}
        isDeleting={this.props.isDeleting}
        columns={[
          { title: translated('customer.id'), field: "id" },
          { title: translated('customer.referenceId'), field: "referenceId" },
          { title: translated('customer.name'), field: "name" },
          { title: translated('customer.email'), field: "email" },
          { title: translated('customer.address1'), field: "address1" },
          { title: translated('customer.address2'), field: "address2" },
          { title: translated('customer.phone1'), field: "phone1" },
          { title: translated('customer.phone2'), field: "phone2" }
        ]}
        filters={
          [
            { title: translated('customer.id'), field: "id", value: this.state.filters.id },
            { title: translated('customer.referenceId'), field: "referenceId", value: this.state.filters.referenceId },
            { title: translated('customer.name'), field: "name", value: this.state.filters.name }
          ]
        }
        onFilter={(data) => this.doFilter(data)}
      />
    );
  }
}

const mapStateToProps = ({ listData }) => {
  return {
    data: listData.data,
    error: listData.error
  };
};

export default connect(mapStateToProps, { customers, customersFiltered, deleteCustomer })(Customers);
