import React, {useState} from "react";
import {connect} from "react-redux";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {createMuiTheme} from "@material-ui/core/styles";
import {Router} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18n from "../i18n";
import history from "../history";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";


const themeObject = {
    palette: {
        primary: {main: '#ef5350'},
        secondary: {main: '#7986cb'}
    },
};

const createTheme = () => {
    const [themeType, setThemeType] = useState('light');
    const theme = {
        ...themeObject
        , palette: {
            ...theme.palette,
            type: themeType
        }
    }
    return [themeType, setThemeType];
};


class App extends React.Component {
    render() {
        const content = this.props.isSignedIn ? (
            <Router history={history}>
                <Dashboard/>
            </Router>
        ) : (
            <SignIn/>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <I18nextProvider i18n={i18n}>
                    <CssBaseline/>
                    {content}
                </I18nextProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        isSignedIn: auth.isSignedIn,
    };
};

export default connect(mapStateToProps, null)(App);
