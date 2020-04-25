import React, { useState } from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { createMuiTheme } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import history from "../history";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const theme = createMuiTheme({
    appBar: {
        color: "#9e9e9e"
    },
    palette: {
        primary: "#f44336",
        secondary: "#7b1fa2"
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
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          {content}
        </I18nextProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isSignedIn: auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(App);
