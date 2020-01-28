import { Route, Switch } from "react-router-dom";
import React from "react";

import RedirectTo from "../pages/RedirectTo";
import CustomerCreate from "../crud/CustomerCreate";
import AccountCreate from "../crud/AccountCreate";
import CustomerUpdate from "../crud/CustomerUpdate";
import AccountUpdate from "../crud/AccountUpdate";
import Customers from "../crud/Customers";
import Customer from "../crud/Customer";
import Account from "../crud/Account";
import LoadingScreen from "../shared/LoadingScreen";

const ContentDrawer = (props) => (
    <React.Fragment>
        <LoadingScreen />
        <Switch>
            <Route path="/redirect" component={RedirectTo} />
            <Route path="/customers" component={Customers} />
            <Route path="/create-customer" component={CustomerCreate} />
            <Route path="/create-account/:parentId" component={AccountCreate} />
            <Route path="/update-customer/:id" component={CustomerUpdate} />
            <Route path="/update-account/:id" component={AccountUpdate} />
            <Route path="/customer/:id" component={Customer} />
            <Route path="/account/:id" component={Account} />
            <Route path="/" />
        </Switch>
    </React.Fragment>
);

export default ContentDrawer;
