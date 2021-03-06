import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Grid, Typography } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import AlertDialog from "./AlertDialog";
import FilterContainer from "./FilterContainer";
import translated from "../shared/Translated";
import { useStyles } from "./Styles";
import { useSelector } from "react-redux";

const addErrorIfNeeded = (error) => {
  return (
    error && (
      <Container>
        <ErrorMessage message={error} />
      </Container>
    )
  );
};

const addFiltersIfNeeded = ({ filters, onFilter }) => {
  return filters && <FilterContainer fields={filters} onFilter={onFilter} />;
};

const TableContainer = (props) => {
  const [deleting, setDeleting] = useState(null);
  const { error } = useSelector(({ crudData }) => crudData);
  const classes = useStyles();
  const history = useHistory();

  // idbuilder function
  const idBuilder = props.idBuilder || ((d) => d.id);

  function drawDeleteDialog({ onDelete }) {
    return (
      <AlertDialog
        data={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={() => onDelete(deleting)}
      />
    );
  }

  return (
    <React.Fragment>
      <MaterialTable
        title='' // empty to hide
        // other props
        columns={props.columns}
        data={props.data || []}
        onRowClick={(event, rowData) =>
          history.push(`${props.readView}/${idBuilder(rowData)}`)
        }
        components={{
          Toolbar: (toolbarProps) => (
            <React.Fragment>
              <Grid justify='space-between' container>
                <Grid>
                  <div className={classes.titleElement}>
                    <Typography variant='h4' gutterBottom>
                      {props.title}
                    </Typography>
                  </div>
                </Grid>
                <Grid>
                  <div className={classes.titleElement}>
                    {props.createView && (
                      <Button
                        color='secondary'
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                        onClick={() => history.push(`${props.createView}`)}>
                        {translated("layout.add")}
                      </Button>
                    )}
                    {props.onRefresh && (
                      <Button
                        color='default'
                        className={classes.button}
                        startIcon={<CachedIcon />}
                        onClick={() => props.onRefresh()}>
                        {translated("layout.refresh")}
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
              {addErrorIfNeeded(error)}
              <Grid justify='space-between' container>
                <Grid>{addFiltersIfNeeded(props)}</Grid>
                <Grid>
                  <MTableToolbar {...toolbarProps} />
                </Grid>
              </Grid>
            </React.Fragment>
          ),
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Update",
            onClick: (event, rowData) =>
              history.push(`${props.updateView}/${idBuilder(rowData)}`),
          },
          {
            icon: "delete",
            tooltip: "delete",
            onClick: (event, rowData) => setDeleting(rowData),
          },
        ]}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} of {count}",
          },
          toolbar: {
            nRowsSelected: "{0} row(s) selected",
            searchTooltip: translated("layout.search"),
            searchPlaceholder: translated("layout.search"),
          },
          header: {
            actions: translated("layout.actions"),
          },
          body: {
            emptyDataSourceMessage: translated("layout.empty"),
            filterRow: {
              filterTooltip: translated("layout.filter"),
            },
          },
        }}
      />
      {deleting && drawDeleteDialog(props)}
    </React.Fragment>
  );
};

export default TableContainer;
