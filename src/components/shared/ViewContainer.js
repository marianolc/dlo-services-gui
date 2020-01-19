import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, Paper, Button, Grid, Typography } from "@material-ui/core";
import {
  Cached as CachedIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

import { formContainerStyles } from './Styles';
import ErrorMessage from "./ErrorMessage";

class ViewContainer extends React.Component {

  drawActions() {
    const { classes } = this.props;
    return (
      <div className={classes.titleElement}>
        {this.props.isUpdate ? (
          <Button
            color="primary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => this.props.history.goBack()}
          >DELETE
        </Button>
        ) : null}
        {!this.props.id ? (
          <Button
            color="default"
            className={classes.button}
            startIcon={<CachedIcon />}
            onClick={this.props.onRefresh}
          >
            REFRESH
      </Button>
        ) : null}
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

  render() {
    if (!this.props.values)
      return <div></div>;

    const { classes } = this.props;
    const ContentName = this.props.content;

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
          <ContentName values={this.props.values} />
        </Paper>
      </React.Fragment>
    );
  }

}

export default withStyles(formContainerStyles)(ViewContainer);
