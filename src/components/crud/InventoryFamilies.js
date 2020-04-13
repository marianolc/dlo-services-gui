import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getInventoryFamilies } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from "../shared/Translated";

const InventoryFamilies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInventoryFamilies());
  }, []);
  const { inventoryFamilies } = useSelector(({ crudData }) => crudData);
  return (
    <TableContainer
      data={inventoryFamilies}
      onRefresh={() => dispatch(getInventoryFamilies())}
      title={translated("inventoryFamily.title")}
      columns={[
        { title: translated("inventoryFamily.id"), field: "id" },
        { title: translated("inventoryFamily.name"), field: "name" },
      ]}
      readView={"/inventory-family"}
    />
  );
};

export default InventoryFamilies;
