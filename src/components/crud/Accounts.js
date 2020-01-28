import React from "react";
import { connect } from "react-redux";

import { accounts, accountsFiltered, deleteAccount } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from '../shared/Translated';
import Status from '../shared/Status';

class Accounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        customerId: props.parent ? props.parent.id : null
      }
    }
  }

  loadData() {
    this.props.accountsFiltered(this.state.filters);
  }

  deleteSelected(data) {
    this.props.deleteAccount(data);
  }

  doFilter(data) {
    this.setState({ filters: data })
    this.props.accountsFiltered(data);
  }

  render() {
    const parentId = this.props.parent.id;
    return (
      <TableContainer
        title={this.props.isChildView ? translated('account.title.child') : translated('account.title')}
        isChildView={this.props.isChildView === true}
        data={this.props.data}
        error={this.props.error}
        onLoad={() => this.loadData()}
        createView={`create-account/${parentId}`}
        updateView={"update-account"}
        readView={"account"}
        onDelete={(d) => this.deleteSelected(d)}
        idBuilder={r => r.id}
        isDeleting={this.props.isDeleting}
        columns={[
          { title: translated('account.id'), field: "id" },
          { title: translated('account.referenceId'), field: "referenceId" },
          { title: translated('account.name'), field: "name" },
          {
            title: translated('account.status'),
            field: "status",
            render: rowData => <Status text={rowData.status} />
          }
        ]}
      />
    );
  }
}

const mapStateToProps = ({ listData }, ownProps) => {
  return {
    data: ownProps.isChildView ? ownProps.data : listData.data,
    error: ownProps.isChildView ? null : listData.error
  };
};

export default connect(mapStateToProps, { accounts, accountsFiltered, deleteAccount })(Accounts);
