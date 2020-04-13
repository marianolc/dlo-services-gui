import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewContainer from "../shared/ViewContainer";
import { inventoryFamily } from "../../actions";
import InventoryFamilyForm from "./InventoryFamilyForm";
import translated from "../shared/Translated";

const InventoryFamily = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(inventoryFamily(props.match.params.id));
  }, []);

  if (!data) return <div></div>;
  return (
    <React.Fragment>
      <ViewContainer
        title={translated("inventoryFamily.title.singular")}
        content={InventoryFamilyForm}
        values={data}
        onRefresh={() => dispatch(inventoryFamily(props.match.params.id))}
      />
    </React.Fragment>
  );
};

export default InventoryFamily;
