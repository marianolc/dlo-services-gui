import React, {useState} from "react";
import MaterialTable, {MTableToolbar} from "material-table";
import {Button, Grid, Typography} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {useHistory} from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import AlertDialog from "./AlertDialog";
import FilterContainer from "./FilterContainer";
import translated from '../shared/Translated';
import {useStyles} from './Styles';
import {useSelector} from "react-redux";

const addErrorIfNeeded = (error) => {
    return error && (
        <Container>
            <ErrorMessage message={error}/>
        </Container>
    );
};

const addFiltersIfNeeded = (filters, onFilter) => {
    return filters && (
        <FilterContainer
            fields={filters}
            onFilter={onFilter}
        />
    );
};

const drawRefreshButtonIfNeeded = (classes, {isChildView,onLoad}) => {
    if (!isChildView) {
        return (<Button
            color="default"
            className={classes.button}
            startIcon={<CachedIcon/>}
            onClick={() => {
                onLoad();
            }}
        >
            {translated('layout.refresh')}
        </Button>);
    }
}


const TableContainer = (props) => {

    const [deleting, setDeleting] = useState(null);
    const {error} = useSelector(({listData}) => listData);
    const classes = useStyles();
    const history = useHistory();

    const dataToShow = props.data || [];

    function handleDialogAcceptOk() {
        setDeleting(null);
        props.onLoad();
    }

    function drawDeleteDialogIfNeeded() {
        if (deleting != null)
            return (
                <AlertDialog
                    data={deleting}
                    handleClose={() => setDeleting(null)}
                    handleAccept={() => handleDialogAccept()}
                    handleAcceptOk={() => handleDialogAcceptOk()}
                />
            );
        else return null;
    }

    return (
        <React.Fragment>
            <MaterialTable
                title={""}
                // other props
                columns={props.columns}
                data={dataToShow}
                onRowClick={(event, rowData) =>
                    history.push(
                        `/${props.readView}/${props.idBuilder(rowData)}`
                    )
                }
                components={{
                    Toolbar: props => (
                        <React.Fragment>
                            <Grid justify="space-between" container>
                                <Grid>
                                    <div className={classes.titleElement}>
                                        <Typography variant="h4" gutterBottom>
                                            {props.title}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={classes.titleElement}>
                                        <Button
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<AddCircleIcon/>}
                                            onClick={() =>
                                                history.push(`/${props.createView}`)
                                            }
                                        >
                                            {translated('layout.add')}
                                        </Button>
                                        {drawRefreshButtonIfNeeded(classes, props)}
                                    </div>
                                </Grid>
                            </Grid>
                            {addErrorIfNeeded()}
                            <Grid justify="space-between" container>
                                <Grid>
                                    {addFiltersIfNeeded(props.filters, props.onFilter)}
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
                            history.push(
                                "/" +
                                props.updateView +
                                "/" +
                                props.idBuilder(rowData)
                            )
                    },
                    {
                        icon: "delete",
                        tooltip: "delete",
                        onClick: (event, rowData) =>
                            setDeleting(rowData)
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
};

export default TableContainer;
