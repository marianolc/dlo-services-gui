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
import translated from '../shared/Translated';

const CustomerForm = props => {
  const { errors, values, touched, handleChange, handleBlur } = props;
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormText
              fieldName={"referenceId"}
              description={translated('customer.referenceId')}
              value={values.referenceId}
              handleChange={handleChange}
              handleBlur={handleBlur}
              readOnly={props.isRead}
              errors={errors}
              touched={touched}
            />
          </Grid>
          <Grid item xs={8}>
            <FormText
              fieldName={"name"}
              description={translated('customer.name')}
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
      <Box m={3}>
        <Divider />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"email"}
            description={translated('customer.email')}
            value={values.email}
            type={'email'}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={props.isRead}
            errors={errors}
            touched={touched}
            icon={<AlternateEmailIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"phone1"}
            description={translated('customer.phone1')}
            value={values.phone1}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={props.isRead}
            errors={errors}
            touched={touched}
            icon={<PhoneIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            fieldName={"phone2"}
            description={translated('customer.phone2')}
            value={values.phone2}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={props.isRead}
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
            description={translated('customer.address1')}
            value={values.address1}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={props.isRead}
            errors={errors}
            touched={touched}
            type={'address'}
          />
        </Grid>
        <Grid item xs={12}>
          <FormText
            fieldName={"address2"}
            description={translated('customer.address2')}
            value={values.address2}
            handleChange={handleChange}
            handleBlur={handleBlur}
            readOnly={props.isRead}
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
