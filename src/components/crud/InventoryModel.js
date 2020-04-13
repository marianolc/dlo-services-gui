import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewContainer from "../shared/ViewContainer";
import { getInventoryModel, deleteInventoryModel } from "../../actions";
import InventoryModelForm from "./InventoryModelForm";
import translated from "../shared/Translated";

const InventoryModel = (props) => {
  const dispatch = useDispatch();
  const { inventoryModel } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(getInventoryModel(props.match.params.id));
  }, []);

  if (!inventoryModel) return <div></div>;
  return (
    <React.Fragment>
      <ViewContainer
        title={translated("inventoryModel.title.singular")}
        content={InventoryModelForm}
        values={inventoryModel}
        onRefresh={() => dispatch(getInventoryModel(props.match.params.id))}
        onDelete={() => dispatch(deleteInventoryModel(inventoryModel))}
      />
    </React.Fragment>
  );
};

export default InventoryModel;
