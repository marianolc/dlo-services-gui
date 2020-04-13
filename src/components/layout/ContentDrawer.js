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
import InventoryFamilies from "../crud/InventoryFamilies";
import InventoryFamily from "../crud/InventoryFamily";
import InventoryModels from "../crud/InventoryModels";
import InventoryModel from "../crud/InventoryModel";
import InventoryModelCreate from "../crud/InventoryModelCreate";
import InventoryModelUpdate from "../crud/InventoryModelUpdate";

const ContentDrawer = () => (
  <React.Fragment>
    <LoadingScreen />
    <Switch>
      <Route path='/redirect' component={RedirectTo} />
      <Route path='/customers' component={Customers} />
      <Route path='/create-customer' component={CustomerCreate} />
      <Route path='/create-account/:parentId' component={AccountCreate} />
      <Route path='/update-customer/:id' component={CustomerUpdate} />
      <Route path='/update-account/:id' component={AccountUpdate} />
      <Route path='/customer/:id' component={Customer} />
      <Route path='/account/:id' component={Account} />
      <Route path='/inventory-families' component={InventoryFamilies} />
      <Route path='/inventory-family/:id' component={InventoryFamily} />
      <Route path='/inventory-models' component={InventoryModels} />
      <Route path='/inventory-model/:id' component={InventoryModel} />
      <Route path='/create-inventory-model' component={InventoryModelCreate} />
      <Route
        path='/update-inventory-model/:id'
        component={InventoryModelUpdate}
      />
      <Route path='/' />
    </Switch>
  </React.Fragment>
);

export default ContentDrawer;
