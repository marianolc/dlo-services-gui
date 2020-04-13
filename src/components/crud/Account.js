import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import GrainIcon from "@material-ui/icons/Grain";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

import ViewContainer from "../shared/ViewContainer";
import { account, deleteAccount } from "../../actions";
import AccountForm from "./AccountForm";
import translated from "../shared/Translated";
import { useStyles } from "../shared/Styles";

const Account = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector(({ crudData }) => crudData);
  useEffect(() => {
    dispatch(account(props.match.params.id));
  }, []);
  const classes = useStyles();

  return (
    <>
      {data && (
        <Breadcrumbs aria-label='breadcrumb' className={classes.root}>
          <Link
            color='inherit'
            href='/'
            onClick={() => history.push(`/customer/${data.customerId}`)}
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
        values={data}
        updateView={"/update-account"}
      />
    </>
  );
};

export default Account;
