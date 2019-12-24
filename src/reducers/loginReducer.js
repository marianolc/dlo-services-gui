export default (
    state = {
        loggedIn: localStorage.hasOwnProperty('sessionToken'),
        error: null,
        token: localStorage.hasOwnProperty('sessionToken') ? localStorage.getItem('sessionToken') : null
    },
    action
) => {

    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('sessionToken', action.payload.token);
            return {...state, loggedIn: true, error: null, token: action.payload.token};
        case "LOGGED_OUT":
            console.log(action);
            return {...state, loggedIn: false, error: action.payload.message, token: false};
        case "LOGIN_ERROR":
            console.log(action);
            return {...state, error: action.payload.message, token: null};
        default:
            return state;
    }
};
