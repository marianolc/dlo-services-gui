import React from "react";
import {withStyles} from "@material-ui/core/styles";
import MaterialTable, {MTableToolbar} from "material-table";
import {Button, Grid, Typography} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import ErrorMessage from "./ErrorMessage";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const styles = theme => ({

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    button: {
        margin: theme.spacing(1),
    },

    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(3),
        },
    },
    titleElement: {
        padding: theme.spacing(2)
    },


    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },


});

class TableContainer extends React.Component {

    drawLoading() {
        return !this.props.loaded ? (
            <Backdrop
                className={this.props.classes.backdrop}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        ) : null;
    }

    addErrorIfNeeded() {
        if (this.props.error !== null)
            return (
                <Container>
                    <ErrorMessage message={this.props.error}/>
                </Container>
            );
        return null;
    }

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                {this.drawLoading()}
                <MaterialTable
                    title={''}
                    // other props

                    columns={this.props.columns}
                    data={this.props.data}

                    components={{
                        Toolbar: props => (
                            <React.Fragment>
                                <Grid
                                    justify="space-between"
                                    container
                                >
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
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<AddCircleIcon/>}
                                                onClick={() => this.props.history.push('/' + this.props.addView)}
                                            >
                                                ADD
                                            </Button>

                                            <Button
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CachedIcon/>}
                                                onClick={() => this.props.loadAction()}
                                            >
                                                REFRESH
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                {this.addErrorIfNeeded()}
                                <Grid
                                    justify="space-between"
                                    container
                                >
                                    <Grid>
                                        <div className={classes.titleElement}>
                                            <TextField id="standard-basic" label="Standard"/>

                                            <Button
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<FilterListIcon/>}>
                                                FILTER
                                            </Button>
                                        </div>


                                    </Grid>
                                    <Grid>
                                        <MTableToolbar {...props} />
                                    </Grid>
                                </Grid>

                            </React.Fragment>
                        ),
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => {
                                this.props.history.push('/' + this.props.editView + "/" + rowData.id)

                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => null
                        }
                    ]}
                />
            </React.Fragment>
        );

    }

}

export default connect(null, null)(withStyles(styles)(withRouter(TableContainer)));
