import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import ViewContainer from "../shared/ViewContainer";
import { customer, deleteCustomer, deleteAccount } from "../../actions";
import CustomerForm from "./CustomerForm";
import translated from "../shared/Translated";
import { accountColumnDefs } from "./Accounts";
import TableContainer from "../shared/TableContainer";

const Customer = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(customer(props.match.params.id));
  }, []);

  if (!data) return <div></div>;
  return (
    <React.Fragment>
      <ViewContainer
        title={translated("customer.title.singular")}
        content={CustomerForm}
        values={data}
        onRefresh={() => dispatch(customer(props.match.params.id))}
        onDelete={() => dispatch(deleteCustomer(data))}
      />
      {
        <>
          <Divider />
          <TableContainer
            title={translated("account.title.child")}
            isChildView={props.isChildView}
            data={data.accounts}
            columns={accountColumnDefs}
            createView={`/create-account/${data.id}`}
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
