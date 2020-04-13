import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { createLoadingSelector } from "../../apis/selectors";
import ErrorMessage from "./ErrorMessage";

const AlertDialog = (props) => {
  const { error, waitingUpdate } = useSelector(({ crudData, loading }) => {
    return {
      error: crudData.error,
      waitingUpdate: loading.waitingUpdate,
    };
  });

  return (
    <Dialog
      open={true}
      onClose={props.onCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        {error && <ErrorMessage message={error} />}
        <DialogContentText id='alert-dialog-description'>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={waitingUpdate}
          onClick={props.onCancel}
          color='primary'>
          Disagree
        </Button>
        <Button
          disabled={waitingUpdate}
          onClick={props.onConfirm}
          color='primary'
          autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
