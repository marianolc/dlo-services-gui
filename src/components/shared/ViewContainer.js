import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import {
  Delete as DeleteIcon
} from "@material-ui/icons";

import { formContainerStyles } from './Styles';
import ErrorMessage from "./ErrorMessage";
import translated from '../shared/Translated';

class ViewContainer extends React.Component {

  drawActions() {
    const { classes } = this.props;
    return (
      <div className={classes.titleElement}>
        <Button
          color="primary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => this.props.history.goBack()}
        >{translated('layout.delete')}
        </Button>
      </div>
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

  drawContent() {
    if (this.props.values === null)
      return <div></div>;
    else {
      const ContentName = this.props.content;
      return (<ContentName
        isRead
        values={this.props.values}
      />);
    }
  }

  render() {
    if (!this.props.values)
      return <div></div>;

    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Grid justify="space-between" container>
            <Grid>
              <div className={classes.titleElement}>
                <Typography variant="h4" gutterBottom>
                  {this.props.title +
                    (!this.props.id ? "" : " #" + this.props.id)}
                </Typography>
              </div>
            </Grid>
            <Grid>
              {this.drawActions()}
            </Grid>
          </Grid>
          {this.addErrorIfNeeded()}
          {this.drawContent()}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(formContainerStyles)(ViewContainer);