import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { customers, customersFiltered, deleteCustomer } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from '../shared/Translated';


const Customers = (props) => {

  const [filters, setFilters] = useState({});
  useEffect(() => {
    dispatch(customersFiltered(filters));
  }, []);
  const dispatch = useDispatch();
  const { data } = useSelector(({ listData }) => listData);


  return (
    <TableContainer
      title={translated('customer.title')}
      data={data}
      onLoad={() => dispatch(customersFiltered(filters))}
      createView={"create-customer"}
      updateView={"update-customer"}
      readView={"customer"}
      onDelete={(d) => deleteCustomer(d.id)}
      idBuilder={r => r.id}
      isDeleting={false}
      columns={[
        { title: translated('customer.id'), field: "id" },
        { title: translated('customer.referenceId'), field: "referenceId" },
        { title: translated('customer.name'), field: "name" },
        { title: translated('customer.email'), field: "email" },
        { title: translated('customer.address1'), field: "address1" },
        { title: translated('customer.address2'), field: "address2" },
        { title: translated('customer.phone1'), field: "phone1" },
        { title: translated('customer.phone2'), field: "phone2" }
      ]}
      filters={
        [
          { title: translated('customer.id'), field: "id", value: filters.id },
          { title: translated('customer.referenceId'), field: "referenceId", value: filters.referenceId },
          { title: translated('customer.name'), field: "name", value: filters.name }
        ]
      }
      onFilter={(data) => setFilters(data)}
    />
  );
}

export default Customers;