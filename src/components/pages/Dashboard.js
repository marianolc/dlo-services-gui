import React from 'react';
import clsx from 'clsx';
import {
    Menu, Drawer, List, ListItem, ListItemText, Divider, AppBar, Toolbar, Paper, IconButton, MenuItem, ListItemIcon
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FlagOptionIcon from '@material-ui/icons/Flag';
import { FlagIcon } from "react-flag-kit";

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { formContainerStyles } from '../shared/Styles';
import ContentDrawer from "../layout/ContentDrawer";
import { logout, changeLanguage } from "../../actions";
import translated from '../shared/Translated';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            anchorLanguageEl: null,
            open: true
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLanguageMenuClose = () => {
        this.setState({ anchorLanguageEl: null });
    };

    changeLanguage(newlang) {
        this.props.changeLanguage(newlang);
        this.setState({ anchorLanguageEl: null });
    }


    render() {
        //const classes = useStyles();
        const { classes } = this.props;
        const languageMenuId = "primary-search-language-menu";
        const menuId = "primary-search-account-menu";

        const isMenuOpen = Boolean(this.state.anchorEl);
        const isLanguageMenuOpen = Boolean(this.state.anchorLanguageEl);

        const languageMenu = (
            <Menu
                anchorEl={this.state.anchorLanguageEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={languageMenuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isLanguageMenuOpen}
                onClose={this.handleLanguageMenuClose}
            >
                <MenuItem onClick={() => this.changeLanguage('en')}>
                    <FlagIcon code="US" size={32} />
                </MenuItem>
                <MenuItem onClick={() => this.changeLanguage('es')}>
                    <FlagIcon code="ES" size={32} />
                </MenuItem>
            </Menu>
        );

        const userMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>
                    {translated('user.profile')}
                </MenuItem>
                <MenuItem onClick={() => this.props.logout()}>
                    {translated('user.logout')}
                </MenuItem>
            </Menu>
        );

        const handleLanguageMenuOpen = event => {
            this.setState({ anchorLanguageEl: event.currentTarget });
        };

        const handleProfileMenuOpen = event => {
            this.setState({ anchorEl: event.currentTarget });
        };

        return (
            <React.Fragment>
                <div className={classes.dashboard_root}>
                    <AppBar position="fixed" className={classes.dashboard_appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.state.open ? this.handleDrawerClose : this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.dashboard_menuButton, this.state.open && classes.dashboard_hide)}>
                                <MenuIcon />
                            </IconButton>

                            <img
                                src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
                                height="32"
                                alt="dlo_logo"
                            />

                            <div className={classes.dashboard_grow} />
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="language"
                                    aria-controls={languageMenuId}
                                    aria-haspopup="true"
                                    onClick={handleLanguageMenuOpen}
                                    color="inherit"
                                >
                                    <FlagOptionIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        className={classes.dashboard_drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}
                        classes={{
                            paper: classes.dashboard_drawerPaper,

                        }}
                    >
                        <div className={classes.dashboard_toolbar} />
                        <List>
                            <ListItem button onClick={() => this.props.history.push('/customers')}
                                selected={this.props.location.pathname === '/customers'}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary={translated('menu.customers')} />
                            </ListItem>
                        </List>
                        <Divider />
                    </Drawer>

                    <main
                        className={clsx(classes.dashboard_content, {
                            [classes.dashboard_contentShift]: this.state.open,
                        })}
                    >
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
    }
}

const componentWithRouter = withRouter(Dashboard);
const componentWithStyles = withStyles(formContainerStyles)(componentWithRouter);

export default connect(null, { logout, changeLanguage })(componentWithStyles);

