import {Route, Switch} from "react-router-dom";
import React from "react";

import Customer from "../crud/Customer";
import Customers from "../crud/Customers";


class ContentDrawer extends React.Component {
    render() {
        return (

            <Switch>
                <Route path="/customers">
                    <Customers/>
                </Route>
                <Route path="/new-customer">
                    <Customer add/>
                </Route>
                <Route path="/customer/:id">
                    <Customer edit/>
                </Route>
                <Route path="/">
                </Route>
            </Switch>
        )
    }
}

export default ContentDrawer;
