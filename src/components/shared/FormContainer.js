import React from "react";
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Typography} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {withRouter} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import ErrorMessage from "./ErrorMessage";
import {resetView} from "../../actions";
import {connect} from "react-redux";

const styles = theme => ({
        root: {
            padding: theme.spacing(2, 2),
        },
        button: {
            margin: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        buttonAction: {},
        actionBar: {
            marginRight: '-17px',
            marginLeft: '-17px',
            marginBottom: '-17px',
            padding: theme.spacing(2),
            backgroundColor: '#E5E7E9'
        },
    })
;


class FormContainer extends React.Component {

    addErrorIfNeeded() {
        if (this.props.error !== null)
            return (
                <Container>
                    <ErrorMessage message={this.props.error}/>
                </Container>
            );
        return null;
    }

    componentDidMount() {
        this.props.getAction(this.props.id);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>

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
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => this.props.history.goBack()}
                                >
                                    DELETE
                                </Button>
                                {!this.props.id ? (
                                    <Button

                                        color="default"
                                        className={classes.button}
                                        startIcon={<CachedIcon/>}
                                    >
                                        REFRESH
                                    </Button>
                                ) : null}

                            </div>
                        </Grid>
                    </Grid>

                    {this.addErrorIfNeeded()}

                    {this.props.content}
                    <div className={classes.actionBar}>
                        <Button
                            color="secondary"
                            variant={"contained"}
                            className={classes.buttonAction}
                            startIcon={<SaveIcon/>}
                            onClick={() => this.props.submitHandler()}
                        >
                            SAVE
                        </Button>
                    </div>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(null, {resetView})(withStyles(styles)(withRouter(FormContainer)));
