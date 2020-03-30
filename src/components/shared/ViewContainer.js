import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ErrorMessage from "./ErrorMessage";
import translated from '../shared/Translated';
import { useStyles } from '../shared/Styles';

const drawActions = (classes, history) => {
  return (
    <div className={classes.titleElement}>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<ArrowBackIcon />}
        onClick={() => history.goBack()}
      >{translated('layout.back')}
      </Button>
    </div>
  );
}

const addErrorIfNeeded = (error) => {
  return error && (
    <Container>
      <ErrorMessage message={error} />
    </Container>
  );
}

const ViewContainer = (props) => {

  const history = useHistory();
  const classes = useStyles();
  const { error } = useSelector(({ viewData }) => viewData);

  const drawContent = ({ values, content }) => {
    if (!values)
      return <></>;
    const ContentName = content;
    return (<ContentName
      isRead
      values={values}
    />);
  }

  if (!props.values)
    return <></>;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid justify="space-between" container>
          <Grid>
            <div className={classes.titleElement}>
              <Typography variant="h4" gutterBottom>
                {props.title +
                  (!props.id ? "" : " #" + props.id)}
              </Typography>
            </div>
          </Grid>
          <Grid>
            {drawActions(classes, history)}
          </Grid>
        </Grid>
        {addErrorIfNeeded(error)}
        {drawContent(props)}
      </Paper>
    </React.Fragment>
  );
}


export default ViewContainer;
