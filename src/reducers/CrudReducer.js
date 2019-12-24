export const listReducer = (
    state = {
        data: [],
        error: null,
        loaded: false
    },
    action
) => {
    switch (action.type) {
        case "list":
            return {data: action.payload, error: null, loaded: true};
        case "list_error":
            return {...state, error: action.payload.message, loaded: true};
        default:
            return state;
    }
};

export const viewReducer = (
    state = {
        data: {},
        error: null,
        loaded: false,
        updated: false
    },
    action
) => {
    switch (action.type) {
        case "view_reset":
            return {data: {}, error: null, loaded: false, updated: false};
        case "view":
            return {data: action.payload, error: null, loaded: true, updated: false};
        case "new":
            return {data: action.payload, error: null, loaded: true, updated: true};
        case "view_error":
            return {...state, error: action.payload.message, loaded: true, updated: false};
        default:
            return state;
    }
};

