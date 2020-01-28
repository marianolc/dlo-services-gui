import React from "react";
import { connect } from "react-redux";

import { inventoryFamily } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from '../shared/Translated';

class InventoryFamily extends React.Component {

  state = {
    data: null
  }

  loadData() {
    this.props.inventoryFamilyFiltered(this.state.filters);
  }

  deleteSelected(data) {
    this.props.deleteInventoryFamily(data.id);
  }

  doFilter(data) {
    this.setState({ filters: data })
    this.props.inventoryFamilyFiltered(data);
  }

  render() {
    return (
      <TableContainer
        title={translated('InventoryFamily.title')}
        data={this.props.data}
        error={this.props.error}
        onLoad={() => this.loadData()}
        readView={"InventoryFamily"}
        idBuilder={r => r.id}
        columns={[
          { title: translated('inventoryFamily.id'), field: "id" },
          { title: translated('inventoryFamily.referenceId'), field: "referenceId" },
          { title: translated('inventoryFamily.name'), field: "name" },
          { title: translated('inventoryFamily.email'), field: "email" },
          { title: translated('inventoryFamily.address1'), field: "address1" },
          { title: translated('inventoryFamily.address2'), field: "address2" },
          { title: translated('inventoryFamily.phone1'), field: "phone1" },
          { title: translated('inventoryFamily.phone2'), field: "phone2" }
        ]}
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

export default connect(mapStateToProps, { inventoryFamily })(InventoryFamily);
