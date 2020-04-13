import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { accountsFiltered, deleteAccount } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from "../shared/Translated";
import Status from "../shared/Status";

export const accountColumnDefs = [
  { title: translated("account.id"), field: "id" },
  { title: translated("account.referenceId"), field: "referenceId" },
  { title: translated("account.name"), field: "name" },
  {
    title: translated("account.status"),
    field: "status",
    render: (rowData) => <Status text={rowData.status} />,
  },
];

const Accounts = (props) => {
  const parentId = props.parent.id;
  const [filters, setFilters] = useState({});
  useEffect(() => {
    dispatch(accountsFiltered({ ...filters, customerId: parentId }));
  }, [filters]);
  const dispatch = useDispatch();
  const data = useSelector(({ crudData }) => crudData.data);

  return (
    <TableContainer
      title={translated("account.title")}
      data={data}
      onRefresh={() =>
        dispatch(accountsFiltered({ ...filters, customerId: parentId }))
      }
      columns={accountColumnDefs}
      createView={`/create-account/${parentId}`}
      updateView={"/update-account"}
      readView={"/account"}
      onDelete={(d) => dispatch(deleteAccount(d))}
    />
  );
};

export default Accounts;
