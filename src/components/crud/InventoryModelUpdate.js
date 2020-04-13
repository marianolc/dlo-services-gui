import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import FormContainer from "../shared/FormContainer";
import {
  getInventoryModel,
  updateInventoryModel,
  deleteInventoryModel,
} from "../../actions";
import InventoryModelForm, {
  InventoryModelValidator,
} from "./InventoryModelForm";
import translated from "../shared/Translated";

const InventoryModelUpdate = (props) => {
  const dispatch = useDispatch();
  const { inventoryModel, inventoryFamilies } = useSelector(
    ({ crudData }) => crudData
  );
  useEffect(() => {
    dispatch(getInventoryModel(props.match.params.id));
  }, []);

  return (
    <FormContainer
      isUpdate
      title={translated("inventoryModel.title.singular")}
      onValidate={InventoryModelValidator}
      content={InventoryModelForm}
      onSubmit={(data) =>
        dispatch(updateInventoryModel(props.match.params.id, data))
      }
      onDelete={(data) =>
        dispatch(deleteInventoryModel(props.match.params.id, data))
      }
      initialValues={inventoryModel}
      additionalData={{ inventoryFamilies: inventoryFamilies || [] }}
    />
  );
};

export default InventoryModelUpdate;
