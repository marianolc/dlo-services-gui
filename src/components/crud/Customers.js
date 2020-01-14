import React from "react";
import { connect } from "react-redux";
import { createLoadingSelector } from '../../apis/selectors';

import { customers, deleteCustomer } from "../../actions";
import TableContainer from "../shared/TableContainer";

class Customers extends React.Component {

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.props.customers();
  }

  deleteSelected(data) {
    this.props.deleteCustomer(data.id);
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
        isFetching={this.props.isFetching}
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
      ></TableContainer>
    );
  }
}

const loadingSelector = createLoadingSelector(['LIST']);
const mapStateToProps = ({ listData, loading }) => {
  return {
    data: listData.data,
    error: listData.error,
    isFetching: loadingSelector(loading)
  };
};

export default connect(mapStateToProps, { customers, deleteCustomer })(Customers);
