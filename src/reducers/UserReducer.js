export default (
    state = {
        data: [],
        error: null,
        loaded: false
    },
    action
) => {
    switch (action.type) {
        case "USERS":
            return {data: action.payload, error: null, loaded: true};
        case "USERS_ERROR":
            return {...state, error: action.payload.message};
        default:
            return state;
    }
};
