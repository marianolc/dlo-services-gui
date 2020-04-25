import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import ViewContainer from "../shared/ViewContainer";
import { getCustomer, deleteCustomer, deleteAccount } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from "../shared/Translated";
import { accountColumnDefs } from "./Accounts";
import TableContainer from "../shared/TableContainer";

const Customer = (props) => {
  const dispatch = useDispatch();
  const { customer } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(getCustomer(props.match.params.id));
  }, []);

  if (!customer) return <></>;
  return (
    <React.Fragment>
      <ViewContainer
        title={translated("customer.title.singular")}
        content={CustomerForm}
        values={customer}
        onRefresh={() => dispatch(getCustomer(props.match.params.id))}
        onDelete={() => dispatch(deleteCustomer(customer))}
        updateView={"/update-customer"}
      />
      {
        <>
          <Divider />
          <TableContainer
            title={translated("account.title.child")}
            isChildView={props.isChildView}
            data={customer.accounts}
            columns={accountColumnDefs}
            createView={`/create-account/${customer.id}`}
            updateView={"/update-account"}
            readView={"/account"}
            onDelete={(d) => dispatch(deleteAccount(d))}
          />
        </>
      }
    </React.Fragment>
  );
};

export default Customer;
