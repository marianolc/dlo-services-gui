import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2)
    },
    childContainer: {
        margin: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(1)
    },
    buttonAction: {},
    actionBar: {
        marginRight: "-17px",
        marginLeft: "-17px",
        marginBottom: "-17px",
        marginTop: "20px",
        padding: theme.spacing(2),
        backgroundColor: "#E5E7E9"
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(3)
        }
    },
    titleElement: {
        padding: theme.spacing(2)
    },
    filterImput: {
        margin: theme.spacing(1),
        width: 150
    },

    signin_paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px"
    },
    signin_form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    sigin_submit: {
        margin: theme.spacing(3, 0, 2)
    },

    dashboard_root: {
        display: 'flex',
    },
    dashboard_appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#E5E7E9",
        color: "#000"
    },
    dashboard_drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    dashboard_drawerPaper: {
        width: drawerWidth,
    },
    dashboard_grow: {
        flexGrow: 1
    },
    dashboard_content: {
        flexGrow: 1,
        padding: theme.spacing(3),

        transition: theme.transitions.create('margin', {
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
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    dashboard_copyright: {
        fontSize: '12px',
        color: '#D7DBDD'
    },
    form_root: {
        padding: theme.spacing(2, 2)
    },
    form_button: {
        margin: theme.spacing(1)
    }
}));

export const formContainerStyles = null;

