import React from "react";
import { Grid } from "@material-ui/core";
import { FormText } from "../shared/FormImputs";
import translated from "../shared/Translated";

const InventoryFamilyForm = (props) => {
  const { errors, values, touched, handleChange, handleBlur } = props;
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <FormText
              fieldName={"name"}
              description={translated("inventoryfamily.name")}
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              readOnly={props.isRead}
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default InventoryFamilyForm;
