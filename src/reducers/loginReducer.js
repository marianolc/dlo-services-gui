import {CHANGE_LANGUAGE, AUTH_SUCCESS, AUTH_SIGN_OUT, AUTH_FAILURE, AUTH_REQUEST} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: (localStorage.getItem('sessionToken') !== null),
    lang: 'us',
    error: null
};

export default (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {...state, error: null};
        case CHANGE_LANGUAGE:
            return {...state, lang: action.payload};
        case AUTH_SUCCESS:
            return {...state,isSignedIn: true, error: null};
        case AUTH_SIGN_OUT:
            return {...state,isSignedIn: false, error: action.payload};
        case AUTH_FAILURE:
            return {...state,isSignedIn: false, error: action.payload};
        default:
            return state;
    }
};
