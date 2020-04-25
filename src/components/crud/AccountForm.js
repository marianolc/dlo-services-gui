import React from "react";
import { Grid } from "@material-ui/core";
import { FormText } from "../shared/FormImputs";
import translated from "../shared/Translated";
import Status from "../shared/Status";

const AccountForm = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <FormText
            {...props}
            fieldName={"referenceId"}
            description={translated("account.referenceId")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormText
            {...props}
            fieldName={"name"}
            description={translated("account.name")}
          />
        </Grid>
        {props.values && (
          <Grid item xs={4}>
            <Status text={props.values.status} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default AccountForm;
