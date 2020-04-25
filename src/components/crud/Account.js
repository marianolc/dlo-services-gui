import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import ViewContainer from "../shared/ViewContainer";
import { getAccount, deleteAccount } from "../../actions";
import AccountForm from "./AccountForm";
import translated from "../shared/Translated";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
  },
  breadcrumb_link: {
    display: "flex",
  },
  breadcrumb_icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Account = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { account } = useSelector(({ crudData }) => crudData);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAccount(props.match.params.id));
  }, []);

  return (
    <>
      {account && (
        <Breadcrumbs aria-label='breadcrumb' className={classes.root}>
          <Link
            color='inherit'
            href='/'
            onClick={() => history.push(`/customer/${account.customerId}`)}
            className={classes.breadcrumb_link}>
            <PersonIcon className={classes.breadcrumb_icon} />
            {translated("customer.title.singular")}
          </Link>
        </Breadcrumbs>
      )}
      <ViewContainer
        isView
        title={translated("account.title.singular")}
        content={AccountForm}
        onDelete={(d) => dispatch(deleteAccount(d))}
        values={account}
        updateView={"/update-account"}
      />
    </>
  );
};

export default Account;
