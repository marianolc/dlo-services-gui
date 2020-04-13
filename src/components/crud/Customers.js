import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { customersFiltered, deleteCustomer } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from "../shared/Translated";

const Customers = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  useEffect(() => {
    dispatch(customersFiltered(filters));
  }, [filters]);
  const { data } = useSelector(({ crudData }) => crudData);

  return (
    <TableContainer
      data={data}
      onRefresh={() => dispatch(customersFiltered(filters))}
      title={translated("customer.title")}
      columns={[
        { title: translated("customer.id"), field: "id" },
        { title: translated("customer.referenceId"), field: "referenceId" },
        { title: translated("customer.name"), field: "name" },
        { title: translated("customer.email"), field: "email" },
        { title: translated("customer.address1"), field: "address1" },
        { title: translated("customer.address2"), field: "address2" },
        { title: translated("customer.phone1"), field: "phone1" },
        { title: translated("customer.phone2"), field: "phone2" },
      ]}
      filters={[
        { title: translated("customer.id"), field: "id", value: filters.id },
        {
          title: translated("customer.referenceId"),
          field: "referenceId",
          value: filters.referenceId,
        },
        {
          title: translated("customer.name"),
          field: "name",
          value: filters.name,
        },
      ]}
      onFilter={(data) => setFilters(data)}
      onDelete={(data) => dispatch(deleteCustomer(data))}
      readView={"/customer"}
      updateView={"/update-customer"}
      createView={"/create-customer"}
    />
  );
};

export default Customers;
