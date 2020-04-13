import React from "react";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";

import { FormText } from "../shared/FormImputs";
import translated from "../shared/Translated";

export const InventoryModelValidator = Yup.object().shape({
  name: Yup.string()
    .required(translated("validations.required"))
    .max(400, translated("validations.string.400max")),
});

const InventoryModelForm = (props) => {
  const { values } = props;
  console.log(values.familyId);
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {props.isRead && (
              <FormText
                {...props}
                fieldName={"family.name"}
                value={values && values.family && values.family.name}
                description={translated("inventoryModel.family")}
              />
            )}
            {!props.isRead && (
              <FormText
                {...props}
                fieldName={"familyId"}
                description={translated("inventoryModel.family")}
                select>
                {props.additionalData &&
                  props.additionalData.inventoryFamilies.map((option, i) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </FormText>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <FormText
              {...props}
              fieldName={"name"}
              description={translated("inventoryModel.name")}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default InventoryModelForm;
