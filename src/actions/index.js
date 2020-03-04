import {
  CHANGE_LANGUAGE, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR, LIST_SUCCESS, LIST_REQUEST, LIST_FAILURE,
  VIEW_REQUEST, VIEW_SUCCESS, VIEW_FAILURE, VIEW_DELETE
} from './types';
import services from "../apis/services";
import history from '../history';
import i18n from "../i18n";


/**
 * Build the header needed for all api requests
 */
const buildHeader = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("sessionToken")
  }
});

const pushOrReload = (dest) => {
  const location = history.location;
  if (location.pathname === dest) {
    const params = new URLSearchParams({ dest });
    history.push(`/redirect?${params}`);
  } else
    history.push(dest);
};


// *********************************************************************************************************************
// login and session
// *********************************************************************************************************************

export const changeLanguage = (newLang) => {
  localStorage.setItem('lang', newLang);
  i18n.changeLanguage(newLang);
  return { type: CHANGE_LANGUAGE, payload: newLang }
};

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
      const response = await services.post("/api" + path, data, buildHeader());
      dispatch({ type: VIEW_SUCCESS, payload: null });
      pushOrReload(dest(response.data));
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

const updateView = (path, data, dest) => {
  return async function (dispatch) {
    dispatch({ type: VIEW_REQUEST });
    try {
      const response = await services.put("/api" + path, data, buildHeader());
      dispatch({ type: VIEW_SUCCESS, payload: null });
      pushOrReload(dest(response.data));
    } catch (err) {
      dispatch(handleError(err, VIEW_FAILURE));
    }
  };
};

const deleteView = (url, data, dest) => {
  return async function (dispatch) {
    dispatch({ type: VIEW_DELETE });
    try {
      await services.delete("/api" + url, buildHeader());
      //
      dispatch({ type: VIEW_SUCCESS, payload: null });
      if (dest)
        pushOrReload(dest(data));
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
  const url = `/customers?${params}`;
  return listView(url);
}
export const customer = (id) => readView(`/customer/${id}`);
export const createCustomer = (data) => createView('/customer', data, d => `/customer/${d.id}`);
export const updateCustomer = (id, data) => updateView(`/customer/${id}`, data, d => `/customer/${d.id}`);
export const deleteCustomer = (data) => deleteView(`/customer/${data.id}`, data, d => `/customers/${d.id}`);

export const accounts = () => listView('/accounts');
export const accountsFiltered = (data) => {
  const params = new URLSearchParams(data);
  const url = `/accounts?${params}`;
  return listView(url);
}
export const account = (id) => readView('/account/' + id);
export const createAccount = (data) => createView('/account', data, d => `/account/${d.id}`);
export const updateAccount = (id, data) => updateView(`/account/${id}`, data, d => `/account/${d.id}`);
export const deleteAccount = (data) => deleteView(`/account/${data.id}`, data, d => `/customer/${d.customerId}`);


export const inventoryFamilies = () => listView('/inventoryFamily');
export const inventoryFamiliesFiltered = (data) => {
  const params = new URLSearchParams(data);
  const url = `/inventoryFamily?${params}`;
  return listView(url);
}
export const inventoryFamily = (id) => readView('/inventoryFamily/' + id);

export const inventoryModels = () => listView('/inventoryModel');
export const inventoryModelsFiltered = (data) => {
  const params = new URLSearchParams(data);
  const url = `/inventoryModel?${params}`;
  return listView(url);
}
export const inventoryModel = (id) => readView('/inventoryModel/' + id);

export const inventories = () => listView('/inventory');
export const inventoriesFiltered = (data) => {
  const params = new URLSearchParams(data);
  const url = `/inventory?${params}`;
  return listView(url);
}
export const inventory = (id) => readView('/inventory/' + id);
export const createInventory = (data) => createView('/inventory', data, d => `/inventory/${d.id}`);
export const updateInventory = (id, data) => updateView(`/inventory/${id}`, data, d => `/inventory/${d.id}`);
export const deleteInventory = (data) => deleteView(`/inventory/${data.id}`, data, d => `/inventory/${d.id}`);
