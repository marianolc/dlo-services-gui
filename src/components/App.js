import React from "react";
import {connect} from "react-redux";
import {CssBaseline} from '@material-ui/core';
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import {red, blue} from '@material-ui/core/colors';
import {BrowserRouter} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: blue,
    },
});

class App extends React.Component {

    render() {
        //console.log(this.props.sessionStatus);
        const content = this.props.sessionStatus.loggedIn ? (
            <BrowserRouter>
                <Dashboard/>
            </BrowserRouter>
        ) : (
            <SignIn/>
        );

        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline/>
                    {content}
                </React.Fragment>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = ({sessionStatus}) => {
    return {
        sessionStatus
    };
};

export default connect(mapStateToProps, null)(App);
