import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";

import ErrorMessage from "../shared/ErrorMessage";
import {login} from "../../actions";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', errors: {}}
    }

    isValid() {
        if (this.state.email && this.state.password)
            return true;
        let errors = {};
        if (!this.state.email)
            errors = {...errors, email: 'Required'};
        if (!this.state.password)
            errors = {...errors, password: 'Required'};
        this.setState({errors});
        console.log(errors);
        return false;
    }

    doLogin = event => {
        event.preventDefault();
        if (this.isValid())
            this.props.login(this.state.email, this.state.password);
    };

    handleEmailChange = e => {
        this.setState({email: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    addErrorIfNeeded() {
        if (this.props.error !== null)
            return (
                <Container>
                    <ErrorMessage message={this.props.error}/>
                </Container>
            );
        return null;
    }

    render() {
        const {classes} = this.props;
        console.log(this.state);
        //const classes = useStyles();
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <img
                        src={process.env.PUBLIC_URL + "/logo_dlo_n.png"}
                        alt="dlo_logo"
                    ></img>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {this.addErrorIfNeeded()}
                    <form className={classes.form}>
                        <TextField
                            error={!this.state.errors.email === false}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={this.state.errors.email ? this.state.errors.email : ''}
                            autoFocus
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            error={!this.state.errors.password === false}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={this.state.errors.password ? this.state.errors.password : ''}
                            onChange={this.handlePasswordChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => this.doLogin(e)}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

const mapStateToProps = ({sessionStatus}) => {
    //console.log(sessionStatus);
    return {
        error: sessionStatus.error
    };
};

export default connect(mapStateToProps, {login})(withStyles(styles)(SignIn));
