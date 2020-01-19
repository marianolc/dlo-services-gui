import React from 'react';
import clsx from 'clsx';
import {
    Menu, Drawer, List, ListItem, ListItemText, Divider, AppBar, Toolbar, Paper, IconButton, MenuItem, ListItemIcon
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import FlagIcon from '@material-ui/icons/Flag';

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import ContentDrawer from "../layout/ContentDrawer";
import { logout } from "../../actions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#E5E7E9",
        color: "#000"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    copyright: {
        fontSize: '12px',
        color: '#D7DBDD'
    }
});

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
                    Profile
                </MenuItem>
                <MenuItem onClick={() => this.props.logout()}>Logout</MenuItem>
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
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.state.open ? this.handleDrawerClose : this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, this.state.open && classes.hide)}>
                                <MenuIcon />
                            </IconButton>

                            <img
                                src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
                                height="32"
                                alt="dlo_logo"
                            />

                            <div className={classes.grow} />
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="language"
                                    aria-controls={languageMenuId}
                                    aria-haspopup="true"
                                    onClick={handleLanguageMenuOpen}
                                    color="inherit"
                                >
                                    <FlagIcon />
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
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.open}
                        classes={{
                            paper: classes.drawerPaper,

                        }}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            <ListItem button onClick={() => this.props.history.push('/customers')}
                                selected={this.props.location.pathname === '/customers'}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary={"Clientes"} />
                            </ListItem>
                        </List>
                        <Divider />
                    </Drawer>

                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: this.state.open,
                        })}
                    >
                        <div className={classes.toolbar} />
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

export default connect(null, { logout })(
    withStyles(styles)(withRouter(Dashboard))
);

