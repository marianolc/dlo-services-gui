import React from 'react';
import { connect } from 'react-redux';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';

import { createLoadingSelector } from '../../apis/selectors';
import ErrorMessage from "./ErrorMessage";

class AlertDialog extends React.Component {

    componentDidUpdate(prevProps) {
        if (!this.props.isDeleting && prevProps.isDeleting && this.props.error === null) {
            this.props.handleAcceptOk();
        }
    }

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    {
                        (this.props.error) ? (<ErrorMessage message={this.props.error} />)
                            : null
                    }
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button enabled={!this.props.isDeleting} onClick={this.props.handleClose} color="primary">
                        Disagree
          </Button>
                    <Button enabled={!this.props.isDeleting} onClick={this.props.handleAccept} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const deleteSelector = createLoadingSelector(['VIEW_DELETE']);
const mapStateToProps = ({ viewData, loading }) => {
    return {
        error: viewData.error,
        isDeleting: deleteSelector(loading)
    };
};

export default connect(mapStateToProps, null)(AlertDialog);
