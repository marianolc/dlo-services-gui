import React from "react";
import { connect } from "react-redux";
import ViewContainer from "../shared/ViewContainer";
import { account, deleteAccount } from "../../actions";
import AccountForm from "./AccountForm";
import translated from '../shared/Translated';

class Account extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.showValues();
  }

  showValues() {
    this.props.account(this.props.match.params.id);
  }

  deleteActual = (data) => {
    this.props.deleteAccount(data);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      //Perform some operation here
      this.setState({ data: this.props.data });
    }
  }

  render() {
    return (
      <ViewContainer
        isView
        title={translated('account.title.singular')}
        error={this.props.error}
        content={AccountForm}
        onDelete={this.deleteActual}
        values={this.state.data}
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

export default connect(mapStateToProps, { account, deleteAccount })(Account);
