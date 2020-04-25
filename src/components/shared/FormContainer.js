import React from "react";
import { useSelector } from "react-redux";
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router-dom";
import { Save as SaveIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";

import ErrorMessage from "./ErrorMessage";
import translated from "./Translated";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
  },
  titleElement: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const drawActions = (waitingUpdate, classes, history, { id }) => {
  return (
    <div className={classes.titleElement}>
      {!id && (
        <Button
          color='secondary'
          className={classes.button}
          startIcon={<CancelIcon />}
          disabled={waitingUpdate}
          onClick={() => history.goBack()}>
          {translated("layout.cancel")}
        </Button>
      )}
    </div>
  );
};

const getFormikForm = (
  classes,
  { validationSchema, initialValues, additionalData, content, onSubmit }
) => {
  if (!initialValues) return;
  const ContentName = content;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {(formProps) => {
        return (
          <Form autoComplete='off'>
            <ContentName {...formProps} additionalData={additionalData} />
            {actionBarIfNeeded(classes)}
          </Form>
        );
      }}
    </Formik>
  );
};

const addError = (error) => {
  return (
    <Container>
      <ErrorMessage message={error} />
    </Container>
  );
};

const actionBarIfNeeded = ({ actionBar, buttonAction }) => {
  return (
    <div className={actionBar}>
      <Button
        color='secondary'
        variant={"contained"}
        className={buttonAction}
        startIcon={<SaveIcon />}
        type='submit'>
        {translated("layout.save")}
      </Button>
    </div>
  );
};

const FormContainer = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { error, waitingUpdate } = useSelector(({ crudData, loading }) => {
    return {
      error: crudData.error,
      waitingUpdate: loading.waitingUpdate,
    };
  });

  return (
    <Paper className={classes.root}>
      <Grid justify='space-between' container>
        <Grid>
          <div className={classes.titleElement}>
            <Typography variant='h4' gutterBottom>
              {translated(props.title) + (!props.id ? "" : " #" + props.id)}
            </Typography>
          </div>
        </Grid>
        <Grid>{drawActions(waitingUpdate, classes, history, props)}</Grid>
      </Grid>
      {error && addError(error)}
      {getFormikForm(classes, props)}
    </Paper>
  );
};

export default FormContainer;
