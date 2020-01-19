import React from "react";
import { connect } from "react-redux";

import { customers, customersFiltered, deleteCustomer } from "../../actions";
import TableContainer from "../shared/TableContainer";

class Customers extends React.Component {

  state = {
    filters: {
    }
  }

  componentDidMount() {
    //this.loadData();
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
        title={"Customers"}
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
          { title: "Id", field: "id" },
          { title: "Reference code", field: "referenceId" },
          { title: "Name", field: "name" },
          { title: "Email", field: "email" },
          { title: "Address 1", field: "address1" },
          { title: "Address 2", field: "address2" },
          { title: "Phone 1", field: "phone1" },
          { title: "Phone 2", field: "phone2" }
        ]}
        filters={[
          { title: "Id", field: "id", value: this.state.filters.id },
          { title: "Reference code", field: "referenceId", value: this.state.filters.referenceId },
          { title: "Name", field: "name", value: this.state.filters.name }
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
