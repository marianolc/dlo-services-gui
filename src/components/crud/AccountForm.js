import React from "react";
import {
  Grid
} from "@material-ui/core";
import { FormText } from '../shared/FormImputs';
import translated from '../shared/Translated';

const AccountForm = props => {
  const { errors = {}, values, touched = {}, handleChange, handleBlur, isRead, submitCount } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormText
            fieldName={"referenceId"}
            description={translated('account.referenceId')}
            value={values.referenceId}
            error={errors.referenceId}
            touched={submitCount > 0 || touched.referenceId}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={isRead}
          />
        </Grid>
        <Grid item xs={8}>
          <FormText
            fieldName={"name"}
            description={translated('account.name')}
            value={values.name}
            error={errors.name}
            touched={submitCount > 0 || touched.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={isRead}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AccountForm;