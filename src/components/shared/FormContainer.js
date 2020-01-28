import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import {
  Cached as CachedIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from "@material-ui/icons";
import { Formik } from "formik";
import { formContainerStyles } from './Styles';
import ErrorMessage from "./ErrorMessage";
import translated from "./Translated";

class FormContainer extends React.Component {

  drawActions() {
    const { classes } = this.props;
    return (
      <div className={classes.titleElement}>
        {this.props.isUpdate ? (<Button
          color="primary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => this.props.history.goBack()}
        >{translated('layout.delete')}
        </Button>) : null}
        {!this.props.id ? (
          <Button
            color="default"
            className={classes.button}
            startIcon={<CachedIcon />}
          >
            {translated('layout.refresh')}
          </Button>
        ) : null}
      </div>
    );
  }
  getFormikForm() {
    if (this.props.initialValues === null)
      return;
    const ContentName = this.props.content;
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
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
              {this.actionBarIfNeeded(isSubmitting)}
            </form>
          );
        }}
      </Formik>
    );
  }

  addErrorIfNeeded() {
    if (this.props.error !== null)
      return (
        <Container>
          <ErrorMessage message={this.props.error} />
        </Container>
      );
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Grid justify="space-between" container>
            <Grid>
              <div className={classes.titleElement}>
                <Typography variant="h4" gutterBottom>
                  {translated(this.props.title) + (!this.props.id ? "" : " #" + this.props.id)}
                </Typography>
              </div>
            </Grid>
            <Grid>
              {this.drawActions()}
            </Grid>
          </Grid>
          {this.addErrorIfNeeded()}
          {this.getFormikForm()}
        </Paper>
      </React.Fragment>
    );
  }

  actionBarIfNeeded(isSubmitting) {
    if (this.props.read) return null;
    const { actionBar, buttonAction } = this.props.classes;
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
  }
}

export default withStyles(formContainerStyles)(FormContainer);