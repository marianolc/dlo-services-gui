import {
  AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR, LIST_SUCCESS, LIST_REQUEST, LIST_FAILURE,
  VIEW_REQUEST, VIEW_SUCCESS, VIEW_FAILURE, VIEW_DELETE
} from './types';
import services from "../apis/services";
import history from '../history';

/**
 * Build the header needed for all api requests
 */
const buildHeader = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("sessionToken")
  }
});

// *********************************************************************************************************************
// login
// *********************************************************************************************************************
export const login = (user, password) => {
  return async function (dispatch) {
    try {
      const response = await services.post("/authenticate", {
        username: user,
        password
      });
      localStorage.setItem("sessionToken", response.data.token);
      dispatch({ type: AUTH_SIGN_IN });
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR, payload: err });
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    localStorage.removeItem("sessionToken");
    dispatch({ type: AUTH_SIGN_OUT, payload: { message: null } });
  };
};

function handleError(err, type) {
  console.log(err);
  if (err.response && err.response.data && err.response.data.status === 401)
    return { type: AUTH_SIGN_OUT, payload: err.response.data.message };
  if (err.response && err.response.data)
    return { type: type, payload: err.response.data.message };
  return { type, payload: err.message };
}

// *********************************************************************************************************************
// crud actions
// *********************************************************************************************************************

const listView = path => {
  return async function (dispatch) {
    dispatch({ type: LIST_REQUEST });
    try {
      const response = await services.get("/api" + path, buildHeader()
      );
      dispatch({ type: LIST_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch(handleError(err, LIST_FAILURE));
    }
  };
};

const readView = path => {
  return async function (dispatch) {
    dispatch({ type: VIEW_REQUEST });
    try {
      const response = await services.get("/api" + path, buildHeader());
      dispatch({ type: VIEW_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

const createView = (path, data, dest) => {
  return async function (dispatch) {
    dispatch({ type: VIEW_REQUEST });
    try {
      /*const response = */await services.post("/api" + path, data, buildHeader());
      dispatch({ type: VIEW_SUCCESS, payload: null });
      history.push(dest);
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

const updateView = (path, data, dest) => {
  return async function (dispatch) {
    dispatch({ type: VIEW_REQUEST });
    try {
      /*const response = */await services.put("/api" + path, data, buildHeader());
      dispatch({ type: VIEW_SUCCESS, payload: null });
      history.push(dest);
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

const deleteView = (url, dest) => {
  return async function (dispatch) {
    dispatch({ type: VIEW_DELETE });
    try {
      await services.delete("/api" + url, buildHeader());
      // 
      dispatch({ type: VIEW_SUCCESS, payload: null });
      if (dest)
        history.push(dest);
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

// *********************************************************************************************************************
// *********************************************************************************************************************

export const customers = () => listView('/customers');
export const customersFiltered = (data) => {
  const params = new URLSearchParams(data);
  const url = '/customers?' + params;
  return listView(url);
}
export const customer = (id) => readView('/customer/' + id);
export const createCustomer = (data) => createView('/customer', data, '/customers');
export const updateCustomer = (id, data) => updateView('/customer/' + id, data, '/customers');
export const deleteCustomer = (id) => deleteView('/customer/' + id, '/customers');

