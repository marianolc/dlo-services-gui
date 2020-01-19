import { Route, Switch } from "react-router-dom";
import React from "react";

import CustomerCreate from "../crud/CustomerCreate";
import CustomerUpdate from "../crud/CustomerUpdate";
import Customers from "../crud/Customers";
import Customer from "../crud/Customer";
import LoadingScreen from "../shared/LoadingScreen";

const ContentDrawer = (props) => (
    <React.Fragment>
        <LoadingScreen />
        <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/create-customer" component={CustomerCreate} />
            <Route path="/update-customer/:id" component={CustomerUpdate} />
            <Route path="/customer/:id" component={Customer} />
            <Route path="/" />
        </Switch>
    </React.Fragment>
);

export default ContentDrawer;
