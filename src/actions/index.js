import services from "../apis/services";
import fakes from "../apis/fakes";

export const login = (user, password) => {
    return async function (dispatch) {
        try {
            const response = await services.post("/authenticate", {
                username: user,
                password
            });
            dispatch({type: "LOGIN", payload: response.data});
        } catch (err) {
            dispatch({type: "LOGIN_ERROR", payload: err});
        }
    };
};

export const logout = () => {
    return async function (dispatch) {
        try {
            const response = await services.post("/logout");
            dispatch({type: "LOGGED_OUT", payload: response});
        } catch (err) {
            dispatch({type: "LOGGED_OUT", payload: err});
        }
    };
};

export const users = () => {
    return async function (dispatch) {
        try {
            const response = await fakes.get("/users");
            dispatch({type: "USERS", payload: response.data});
        } catch (err) {
            dispatch({type: "USERS_ERROR", payload: err});
        }
    };
};

// *********************************************************************************************************************
// customers
// *********************************************************************************************************************
export const customers = () => {
    return async function (dispatch) {
        try {
            const response = await services
                .get("/api/customers", {headers: {Authorization: 'Bearer ' + localStorage.getItem('sessionToken')}})
                .catch(error => {
                    if (error.response.data.status===401) {
                        console.log('session error');
                        dispatch({type: "LOGGED_OUT", payload: error});
                    }else {
                        console.log('normal error');
                        dispatch({type: "list_error", payload: error});
                    }
                });
            dispatch({type: "list", payload: response.data});
        } catch (err) {
            dispatch({type: "list_error", payload: err});
        }
    };
};

export const customer = (id) => {
    console.log(id);
    return !id ?
        {
            type: "view", payload: {
                name: null,
                email: null
            }
        } : async function (dispatch) {
            try {
                const response = await services.get("/api/customer/" + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('sessionToken')}});
                dispatch({type: "view", payload: response.data});
            } catch (err) {
                console.log(err);
                dispatch({type: "view_error", payload: err});
            }
        };
};

export const newCustomer = (customer) => {
    return async function (dispatch) {
        try {
            const response = await services.post("/api/customer", customer, {headers: {Authorization: 'Bearer ' + localStorage.getItem('sessionToken')}});
            dispatch({type: "new", payload: response.data});
        } catch (err) {
            dispatch({type: "view_error", payload: err});
        }
    };
};
// *********************************************************************************************************************
// *********************************************************************************************************************
export const resetView = () => {
    return {type: "view_reset"}
};
