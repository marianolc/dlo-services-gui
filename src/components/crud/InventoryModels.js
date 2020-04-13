import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getInventoryModels, deleteInventoryModel } from "../../actions";
import TableContainer from "../shared/TableContainer";
import translated from "../shared/Translated";

const InventoryModels = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInventoryModels());
  }, []);
  const { inventoryModels } = useSelector(({ crudData }) => crudData);
  return (
    <TableContainer
      data={inventoryModels}
      onRefresh={() => dispatch(getInventoryModels())}
      title={translated("inventoryModel.title")}
      columns={[
        { title: translated("inventoryModel.id"), field: "id" },
        { title: translated("inventoryModel.family"), field: "family.name" },
        { title: translated("inventoryModel.name"), field: "name" },
      ]}
      onDelete={(d) => dispatch(deleteInventoryModel(d))}
      readView={"/inventory-model"}
      updateView={"/update-inventory-model"}
      createView={"/create-inventory-model"}
    />
  );
};

export default InventoryModels;
