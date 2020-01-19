import React from "react";
import {
  Grid,
  Box,
  Divider
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { FormText, FormTextWithIcon } from '../shared/FormImputs';

const CustomerForm = props => {
  const inputProps = props.read === true ? { readOnly: true } : {};
  const { errors, values, touched, handleChange, handleBlur } = props;
  console.log(values);
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormText
              fieldName={"referenceId"}
              description={"Reference code"}
              value={values.referenceId}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputProps={inputProps}
              errors={errors}
              touched={touched}
            />
          </Grid>
          <Grid item xs={8}>
            <FormText
              fieldName={"name"}
              description={"Name"}
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputProps={inputProps}
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
      </div>
      <Box m={3}>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"email"}
            description={"Email"}
            value={values.email}
            type={'email'}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputProps={inputProps}
            errors={errors}
            touched={touched}
            icon={<AlternateEmailIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"phone1"}
            description={"Phone 1"}
            value={values.phone1}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputProps={inputProps}
            errors={errors}
            touched={touched}
            icon={<PhoneIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"phone2"}
            description={"Phone 2"}
            value={values.phone2}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputProps={inputProps}
            errors={errors}
            touched={touched}
            icon={<PhoneAndroidIcon />}
          />
        </Grid>
      </Grid>
      <Box m={3}>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormText
            fieldName={"address1"}
            description={"Address 1"}
            value={values.address1}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputProps={inputProps}
            errors={errors}
            touched={touched}
            type={'address'}
          />
        </Grid>
        <Grid item xs={12}>
          <FormText
            fieldName={"address2"}
            description={"Address 2"}
            value={values.address2}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputProps={inputProps}
            errors={errors}
            touched={touched}
            type={'address'}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerForm;