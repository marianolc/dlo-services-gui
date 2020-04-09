import React from "react";
import { useSelector } from 'react-redux';
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from "react-router-dom";
import {
  Cached as CachedIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from "@material-ui/icons";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import translated from "./Translated";
import { useStyles } from './Styles';

const drawActions = (waitingUpdate, classes, history, { id }) => {
  return (
    <div className={classes.titleElement}>
      {!id && (
        <Button
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
          disabled={waitingUpdate}
          onClick={() => history.goBack()}
        >
          {translated('layout.cancel')}
        </Button>
      )}
    </div>
  );
};

const getFormikForm = (classes, { initialValues, content, onSubmit }) => {
  if (!initialValues)
    return;
  const ContentName = content;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={
        values => {
          const errors = {};
          if (!values.referenceId) {
            errors.referenceId = "Required";
          }
          return errors;
        }}
    >
      {props => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitCount
        } = props;
        return (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <ContentName
              submitCount={submitCount}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {actionBarIfNeeded(classes, isSubmitting)}
          </form>
        );
      }}
    </Formik>
  );
};

const addError = (error) => {
  return (<Container>
    <ErrorMessage message={error} />
  </Container>)
};

const actionBarIfNeeded = ({ actionBar, buttonAction }, isSubmitting) => {
  return (
    <div className={actionBar}>
      <Button
        color="secondary"
        variant={"contained"}
        className={buttonAction}
        startIcon={<SaveIcon />}
        type="submit"
      >
        {translated('layout.save')}
      </Button >
    </div>
  );
};

const FormContainer = (props) => {

  const classes = useStyles();
  const history = useHistory();
  const { error, waitingUpdate } = useSelector(({ viewData, loading }) => {
    return ({
      error: viewData.error,
      waitingUpdate: loading.waitingUpdate
    })
  });

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid justify="space-between" container>
          <Grid>
            <div className={classes.titleElement}>
              <Typography variant="h4" gutterBottom>
                {translated(props.title) + (!props.id ? "" : " #" + props.id)}
              </Typography>
            </div>
          </Grid>
          <Grid>
            {drawActions(waitingUpdate, classes, history, props)}
          </Grid>
        </Grid>
        {error && addError(error)}
        {getFormikForm(classes, props)}
      </Paper>
    </React.Fragment>
  );
};

export default FormContainer;
