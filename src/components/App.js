import React, { useState } from "react";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import history from "../history";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const theme = createMuiTheme({
  palette: {
    primary1Color: "#f44336",
    accent1Color: "#ad1457",
  },
  overrides: {
    muiAppBar: {
      color: "#E5E7E9",
      textColor: "#000000",
    },
  },
});

const useDarkMode = () => {
  const [theme, setTheme] = useState(theme);
};

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
