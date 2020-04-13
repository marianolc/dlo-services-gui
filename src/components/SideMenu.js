import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InboxIcon from "@material-ui/icons/Inbox";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import ListAltIcon from "@material-ui/icons/ListAlt";

import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import translated from "./shared/Translated";

const SideMenu = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <List>
      <ListItem
        button
        onClick={() => history.push("/customers")}
        selected={location.pathname === "/customers"}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={translated("menu.customers")} />
      </ListItem>

      <ListItem
        button
        onClick={() => history.push("/inventory-families")}
        selected={location.pathname === "/inventory-families"}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary={translated("menu.inventoryFamily")} />
      </ListItem>

      <ListItem
        button
        onClick={() => history.push("/inventory-models")}
        selected={location.pathname === "/inventory-models"}>
        <ListItemIcon>
          <AllInboxIcon />
        </ListItemIcon>
        <ListItemText primary={translated("menu.inventoryModel")} />
      </ListItem>

      <ListItem
        button
        onClick={() => history.push("/inventory")}
        selected={location.pathname === "/inventory"}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={translated("menu.inventory")} />
      </ListItem>
    </List>
  );
};

export default SideMenu;
