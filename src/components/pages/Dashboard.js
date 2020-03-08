import React, {useState} from 'react';
import clsx from 'clsx';
import {
    Menu, Drawer, List, ListItem, ListItemText, Divider, AppBar, Toolbar, Paper, IconButton, MenuItem, ListItemIcon
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
import FlagOptionIcon from '@material-ui/icons/Flag';
import {FlagIcon} from "react-flag-kit";
import {useHistory, useLocation} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useStyles} from '../shared/Styles';
import ContentDrawer from "../layout/ContentDrawer";

import {logout, changeLanguage} from "../../actions";
import translated from '../shared/Translated';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLanguageEl, setAnchorLanguageEl] = useState(null);
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

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
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={languageMenuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isLanguageMenuOpen}
            onClose={() => setAnchorLanguageEl(null)}
        >
            <MenuItem onClick={() => changeLanguageAndCloseMenu('en')}>
                <FlagIcon code="US" size={32}/>
            </MenuItem>
            <MenuItem onClick={() => changeLanguageAndCloseMenu('es')}>
                <FlagIcon code="ES" size={32}/>
            </MenuItem>
        </Menu>
    );

    const userMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={() => setAnchorEl(null)}>
                {translated('user.profile')}
            </MenuItem>
            <MenuItem onClick={() => dispatch(logout())}>
                {translated('user.logout')}
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <div className={classes.dashboard_root}>
                <AppBar position="fixed" className={classes.dashboard_appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(!open)}
                            edge="start"
                            className={clsx(classes.dashboard_menuButton, open && classes.dashboard_hide)}>
                            <MenuIcon/>
                        </IconButton>

                        <img
                            src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
                            height="32"
                            alt="dlo_logo"
                        />

                        <div className={classes.dashboard_grow}/>
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="language"
                                aria-controls={languageMenuId}
                                aria-haspopup="true"
                                onClick={(event) => {
                                    setAnchorLanguageEl(event.currentTarget)
                                }}
                                color="inherit"
                            >
                                <FlagOptionIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget)
                                }}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.dashboard_drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.dashboard_drawerPaper,
                    }}
                >
                    <div className={classes.dashboard_toolbar}/>
                    <List>
                        <ListItem button onClick={() => history.push('/customers')}
                                  selected={location.pathname === '/customers'}>
                            <ListItemIcon>
                                <AccountCircle/>
                            </ListItemIcon>
                            <ListItemText primary={translated('menu.customers')}/>
                        </ListItem>
                    </List>
                    <Divider/>
                </Drawer>
                <main
                    className={clsx(classes.dashboard_content, {
                        [classes.dashboard_contentShift]: open,
                    })}
                >
                    <div className={classes.dashboard_toolbar}/>
                    <Paper>
                        <ContentDrawer/>
                    </Paper>
                </main>
                {languageMenu}
                {userMenu}
            </div>
        </React.Fragment>
    );
};

export default Dashboard;