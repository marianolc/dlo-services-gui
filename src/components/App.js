import React from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

import history from '../history';
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";


const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  }
});

class App extends React.Component {
  render() {
    const content = this.props.isSignedIn ? (
      <Router history={history}>
        <Dashboard />
      </Router>
    ) : (
        <SignIn />
      );

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            {content}
          </I18nextProvider>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isSignedIn: auth.isSignedIn
  };
};

export default connect(mapStateToProps, null)(App);
