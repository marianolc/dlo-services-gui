import { makeStyles } from "@material-ui/core/styles";

export const formStyles = makeStyles(theme => ({
    form_root: {
        padding: theme.spacing(2, 2)
    },
    form_button: {
        margin: theme.spacing(1)
    }
}));

export const formContainerStyles = theme => ({
    root: {
        padding: theme.spacing(2, 2)
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
    }

});
