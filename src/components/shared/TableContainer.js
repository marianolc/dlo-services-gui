import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Grid, Typography } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withRouter } from "react-router-dom";

import { formContainerStyles as styles } from "./Styles";
import ErrorMessage from "./ErrorMessage";
import AlertDialog from "./AlertDialog";
import FilterContainer from "./FilterContainer";
import translated from '../shared/Translated';

class TableContainer extends React.Component {

  state = {
    deleting: null
  };

  addErrorIfNeeded() {
    if (this.props.error !== null)
      return (
        <Container>
          <ErrorMessage message={this.props.error} />
        </Container>
      );
    return null;
  }

  addFiltersIfNeeded() {
    if (!this.props.filters)
      return;
    return (
      <FilterContainer
        fields={this.props.filters}
        onFilter={this.props.onFilter}
      ></FilterContainer>
    );
  }

  drawRefreshButtonIfNeeded(classes) {
    if (!this.props.isChildView) {
      return (<Button
        color="default"
        className={classes.button}
        startIcon={<CachedIcon />}
        onClick={() => {
          this.props.onLoad();
        }}
      >
        {translated('layout.refresh')}
      </Button>);
    }

  }
  render() {
    const { classes } = this.props;
    const dataToShow = this.props.data ? this.props.data : [];
    return (
      <React.Fragment>
        <MaterialTable
          title={""}
          // other props
          columns={this.props.columns}
          data={dataToShow}
          onRowClick={(event, rowData) =>
            this.props.history.push(
              `/${this.props.readView}/${this.props.idBuilder(rowData)}`
            )
          }
          components={{
            Toolbar: props => (
              <React.Fragment>
                <Grid justify="space-between" container>
                  <Grid>
                    <div className={classes.titleElement}>
                      <Typography variant="h4" gutterBottom>
                        {this.props.title}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid>
                    <div className={classes.titleElement}>
                      <Button
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                        onClick={() =>
                          this.props.history.push(`/${this.props.createView}`)
                        }
                      >
                        {translated('layout.add')}
                      </Button>
                      {this.drawRefreshButtonIfNeeded(classes)}
                    </div>
                  </Grid>
                </Grid>
                {this.addErrorIfNeeded()}
                <Grid justify="space-between" container>
                  <Grid>
                    {this.addFiltersIfNeeded()}
                  </Grid>
                  <Grid>
                    <MTableToolbar {...props} />
                  </Grid>
                </Grid>
              </React.Fragment>
            )
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Update",
              onClick: (event, rowData) =>
                this.props.history.push(
                  "/" +
                  this.props.updateView +
                  "/" +
                  this.props.idBuilder(rowData)
                )
            },
            {
              icon: "delete",
              tooltip: "delete",
              onClick: (event, rowData) =>
                this.setState({
                  deleting: rowData
                })
            }
          ]}

          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} of {count}'
            },
            toolbar: {
              nRowsSelected: '{0} row(s) selected',
              searchTooltip: translated('layout.search'),
              searchPlaceholder: translated('layout.search'),
            },
            header: {
              actions: translated('layout.actions')
            },
            body: {
              emptyDataSourceMessage: translated('layout.empty'),
              filterRow: {
                filterTooltip: translated('layout.filter')
              }
            }
          }}
        />
        {this.drawDeleteDialogIfNeeded()}
      </React.Fragment>
    );
  }

  handleDialogClose() {
    this.setState({ deleting: null });
  }

  handleDialogAccept() {
    this.props.onDelete(this.state.deleting);
  }

  handleDialogAcceptOk() {
    this.setState({ deleting: null });
    this.props.onLoad();
  }

  drawDeleteDialogIfNeeded() {
    if (this.state.deleting != null)
      return (
        <AlertDialog
          data={this.state.deleting}
          handleClose={() => this.handleDialogClose()}
          handleAccept={() => this.handleDialogAccept()}
          handleAcceptOk={() => this.handleDialogAcceptOk()}
        />
      );
    else return null;
  }
}

export default withStyles(styles)(withRouter(TableContainer));