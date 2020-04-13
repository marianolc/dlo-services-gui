import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { Delete as DeleteIcon } from "@material-ui/icons";

import AlertDialog from "./AlertDialog";
import ErrorMessage from "./ErrorMessage";
import translated from "../shared/Translated";
import { useStyles } from "../shared/Styles";

const addError = (error) => {
  return (
    <Container>
      <ErrorMessage message={error} />
    </Container>
  );
};

const ViewContainer = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { error } = useSelector(({ crudData }) => crudData);
  const [deleting, setDeleting] = useState(null);

  const drawContent = ({ values, content }) => {
    if (!values) return <></>;
    const ContentName = content;
    return <ContentName isRead values={values} />;
  };

  if (!props.values) return <></>;

  // idbuilder function
  const idBuilder = props.idBuilder || ((d) => d.id);

  //
  return (
    <React.Fragment>
      {deleting && (
        <AlertDialog
          data={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={props.onDelete}
        />
      )}
      <Paper className={classes.root}>
        <Grid justify='space-between' container>
          <Grid>
            <div className={classes.titleElement}>
              <Typography variant='h4' gutterBottom>
                {props.title + (!props.id ? "" : " #" + props.id)}
              </Typography>
            </div>
          </Grid>
          <Grid>
            <div className={classes.titleElement}>
              {props.onDelete && (
                <Button
                  color='primary'
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleting(props.values)}>
                  {translated("layout.delete")}
                </Button>
              )}
              {props.updateView && (
                <Button
                  className={classes.button}
                  color='secondary'
                  startIcon={<EditIcon />}
                  onClick={() =>
                    history.push(
                      `${props.updateView}/${idBuilder(props.values)}`
                    )
                  }>
                  {translated("layout.update")}
                </Button>
              )}
              <Button
                className={classes.button}
                startIcon={<ArrowBackIcon />}
                onClick={() => history.goBack()}>
                {translated("layout.back")}
              </Button>
            </div>
          </Grid>
        </Grid>
        {error && addError(error)}
        {drawContent(props)}
      </Paper>
    </React.Fragment>
  );
};

export default ViewContainer;
