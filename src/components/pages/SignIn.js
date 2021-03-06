import React from "react";

import {
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../shared/ErrorMessage";
import { login } from "../../actions";

const useStyles = makeStyles((theme) => ({
  signin_paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  sigin_submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  const classes = useStyles();
  const { error, loading } = useSelector(({ auth, loading }) => ({
    error: auth.error,
    loading: loading.waitingRequest,
  }));
  const dispatch = useDispatch();
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.signin_paper}>
        <img src={process.env.PUBLIC_URL + "/logo_dlo_n.png"} alt='dlo_logo' />
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {error && (
          <Container>
            <ErrorMessage message={error} />
          </Container>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Required";
            if (!values.password) errors.password = "Required";
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(login(values.email, values.password));
          }}>
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='email'
                  label='Email Address'
                  autoComplete='email'
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
                <TextField
                  required
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  type='submit'
                  className={classes.submit}
                  disabled={loading}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
