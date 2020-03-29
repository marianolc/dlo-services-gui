import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from '@material-ui/core/Divider';
import ViewContainer from "../shared/ViewContainer";
import { customer } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from '../shared/Translated';
import Accounts from './Accounts';

const Customer = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ viewData }) => viewData);
  useEffect(() => {
    dispatch(customer(props.match.params.id));
  }, []);

  if (!data)
    return <div></div>;
  return (
    <React.Fragment>
      <ViewContainer
        title={translated('customer.title.singular')}
        content={CustomerForm}
        values={data}
        onRefresh={() => dispatch(customer(props.match.params.id))}
      />
      {/*<Divider />
      <Accounts
        data={data.accounts}
        isChildView
        parent={data}
      />*/}
    </React.Fragment>
  );
}

export default Customer;