import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import {MenuItem} from "@material-ui/core";
import {connect} from "react-redux";
import {logout} from "../../actions";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from 'react-router-dom';

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MailIcon from "@material-ui/icons/Mail";
import ContentDrawer from "../layout/ContentDrawer";


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
    })
;


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {anchorEl: null, open: true};
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogout = () => {
        this.props.logout();
    };

    render() {

        //const classes = useStyles();
        const {classes} = this.props;

        const menuId = "primary-search-account-menu";
        const isMenuOpen = Boolean(this.state.anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );

        const handleProfileMenuOpen = event => {
            this.setState({anchorEl: event.currentTarget});
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
                                <MenuIcon/>
                            </IconButton>

                            <img
                                src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
                                height="32"
                                alt="dlo_logo"
                            />

                            <div className={classes.grow}/>
                            <div>
                                {
                                    /*<IconButton onClick={this.props.onToggleDark}>
                                    <Brightness4Icon/>
                                </IconButton>
                                    */
                                }
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
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
                        <div className={classes.toolbar}/>
                        <List>
                            <ListItem button onClick={() => this.props.history.push('/customers')}
                                      selected={this.props.location.pathname === '/customers'}>
                                <ListItemIcon>
                                    <AccountCircle/>
                                </ListItemIcon>
                                <ListItemText primary={"Clientes"}/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button onClick={() => this.props.history.push('/')}
                                      selected={this.props.activeView === 'USERS'}>
                                <ListItemIcon>
                                    <MailIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Otro"}/>
                            </ListItem>
                        </List>
                        <Divider/>
                    </Drawer>

                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: this.state.open,
                        })}
                    >
                        <div className={classes.toolbar}/>
                        <Paper>
                            <ContentDrawer/>
                        </Paper>
                    </main>

                    {renderMenu}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({viewStatus}) => {
    return {
        activeView: viewStatus.activeView
    };
};

export default connect(mapStateToProps, {logout})(
    withStyles(styles)(withRouter(Dashboard))
);

