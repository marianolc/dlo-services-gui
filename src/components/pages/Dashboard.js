import React, { useState } from "react";
import clsx from "clsx";
import {
  Menu,
  Drawer,
  Divider,
  AppBar,
  Toolbar,
  Paper,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import FlagOptionIcon from "@material-ui/icons/Flag";
import { FlagIcon } from "react-flag-kit";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useDispatch } from "react-redux";
import ContentDrawer from "../layout/ContentDrawer";

import { logout, changeLanguage } from "../../actions";
import translated from "../shared/Translated";
import SideMenu from "../../components/SideMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  dashboard_root: {
    display: "flex",
  },
  dashboard_appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  dashboard_drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  dashboard_drawerPaper: {
    width: drawerWidth,
  },
  dashboard_grow: {
    flexGrow: 1,
  },
  dashboard_content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  dashboard_toolbar: theme.mixins.toolbar,
  dashboard_menuButton: {
    marginRight: theme.spacing(2),
  },
  dashboard_contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLanguageEl, setAnchorLanguageEl] = useState(null);
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  function changeLanguageAndCloseMenu(newlang) {
    dispatch(changeLanguage(newlang));
    setAnchorLanguageEl(null);
  }

  const languageMenuId = "primary-search-language-menu";
  const menuId = "primary-search-account-menu";

  const isMenuOpen = Boolean(anchorEl);
  const isLanguageMenuOpen = Boolean(anchorLanguageEl);

  const languageMenu = (
    <Menu
      anchorEl={anchorLanguageEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isLanguageMenuOpen}
      onClose={() => setAnchorLanguageEl(null)}>
      <MenuItem onClick={() => changeLanguageAndCloseMenu("en")}>
        <FlagIcon code='US' size={32} />
      </MenuItem>
      <MenuItem onClick={() => changeLanguageAndCloseMenu("es")}>
        <FlagIcon code='ES' size={32} />
      </MenuItem>
    </Menu>
  );

  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}>
      <MenuItem onClick={() => setAnchorEl(null)}>
        {translated("user.profile")}
      </MenuItem>
      <MenuItem onClick={() => dispatch(logout())}>
        {translated("user.logout")}
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className={classes.dashboard_root}>
        <AppBar color="primary" position='fixed' className={classes.dashboard_appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={() => setOpen(!open)}
              edge='start'
              className={clsx(
                classes.dashboard_menuButton,
                open && classes.dashboard_hide
              )}>
              <MenuIcon />
            </IconButton>

            <img
              src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
              height='32'
              alt='dlo_logo'
            />

            <div className={classes.dashboard_grow} />
            <div>
              <IconButton
                edge='end'
                aria-label='language'
                aria-controls={languageMenuId}
                aria-haspopup='true'
                onClick={(event) => {
                  setAnchorLanguageEl(event.currentTarget);
                }}
                color='inherit'>
                <FlagOptionIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
                color='inherit'>
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.dashboard_drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.dashboard_drawerPaper,
          }}>
          <div className={classes.dashboard_toolbar} />
          <SideMenu />
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.dashboard_content, {
            [classes.dashboard_contentShift]: open,
          })}>
          <div className={classes.dashboard_toolbar} />
          <Paper>
            <ContentDrawer />
          </Paper>
        </main>
        {languageMenu}
        {userMenu}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
