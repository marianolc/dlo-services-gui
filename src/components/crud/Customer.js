import React from "react";
import { connect } from "react-redux";
import Divider from '@material-ui/core/Divider';
import ViewContainer from "../shared/ViewContainer";
import { customer, deleteCustomer } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from '../shared/Translated';
import Accounts from './Accounts';

class Customer extends React.Component {

  state = {
    data: null
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.showValues();
  }

  showValues() {
    this.props.customer(this.props.match.params.id);
  }

  deleteActual = (data) => {
    this.props.deleteCustomer(data.id);
  };

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (prevProps.data !== this.props.data) {
      //Perform some operation here
      this.setState({ data: this.props.data });
    }
  }

  render() {
    console.log('render');
    console.log(this.state.data);
    if (this.state.data === null || this.props.data === null)
      return <div></div>;
    return (
      <React.Fragment>
        <ViewContainer
          isView
          title={translated('customer.title.singular')}
          error={this.props.error}
          content={CustomerForm}
          onDelete={this.deleteActual}
          values={this.props.data}
          onRefresh={() => this.showValues()}
        />
        <Divider />
        <Accounts
          data={this.props.data.accounts}
          isChildView
          parent={this.props.data}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ viewData }) => {
  console.log('mapStateToProps');
  console.log(viewData.data);
  return {
    data: viewData.data,
    error: viewData.error
  };
};

export default connect(mapStateToProps, { customer, deleteCustomer })(Customer);
