import { Route, Switch } from "react-router-dom";
import React from "react";

import CustomerCreate from "../crud/CustomerCreate";
import CustomerUpdate from "../crud/CustomerUpdate";
import Customers from "../crud/Customers";

const ContentDrawer = (props) => (
    <Switch>
        <Route path="/customers">
            <Customers />
        </Route>
        <Route path="/create-customer">
            <CustomerCreate />
        </Route>
        <Route path="/update-customer/:id" component={CustomerUpdate}>
        </Route>
        <Route path="/">
        </Route>
    </Switch>
);

export default ContentDrawer;
