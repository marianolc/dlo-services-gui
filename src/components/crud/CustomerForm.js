import React from "react";
import { Grid, Box, Divider } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { FormText, FormTextWithIcon } from "../shared/FormImputs";
import translated from "../shared/Translated";

const CustomerForm = (props) => {
  const { errors, values, touched, handleChange, handleBlur } = props;
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormText
              fieldName={"referenceId"}
              description={translated("customer.referenceId")}
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
              {...props}
              fieldName={"name"}
              description={translated("customer.name")}
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
            {...props}
            fieldName={"email"}
            description={translated("customer.email")}
            type={"email"}
            icon={<AlternateEmailIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            {...props}
            fieldName={"phone1"}
            description={translated("customer.phone1")}
            icon={<PhoneIcon />}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextWithIcon
            {...props}
            fieldName={"phone2"}
            description={translated("customer.phone2")}
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
            {...props}
            fieldName={"address1"}
            description={translated("customer.address1")}
            type={"address"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormText
            {...props}
            fieldName={"address2"}
            description={translated("customer.address2")}
            type={"address"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerForm;
