import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../shared/FormContainer";
import { createInventoryModel, getInventoryFamilies } from "../../actions";
import InventoryModelForm, {
  InventoryModelValidator,
} from "./InventoryModelForm";
import translated from "../shared/Translated";

const InventoryModelCreate = () => {
  const dispatch = useDispatch();
  const { inventoryFamilies } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(getInventoryFamilies());
  }, []);

  return (
    <FormContainer
      title={translated("inventoryModel.title.singular")}
      validationSchema={InventoryModelValidator}
      content={InventoryModelForm}
      onSubmit={(d) => dispatch(createInventoryModel(d))}
      initialValues={{
        familyId: (inventoryFamilies[0] && inventoryFamilies[0].id) || "",
      }}
      additionalData={{ inventoryFamilies: inventoryFamilies || [] }}
    />
  );
};

export default InventoryModelCreate;
