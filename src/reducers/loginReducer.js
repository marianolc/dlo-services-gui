import { CHANGE_LANGUAGE, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: (localStorage.getItem('sessionToken') !== null),
    lang: 'us',
    error: null
}

export default (
    state = INITIAL_STATE,
    action
) => {

    switch (action.type) {
        case CHANGE_LANGUAGE:
            return { ...state, lang: action.payload };
        case AUTH_SIGN_IN:
            return { isSignedIn: true, error: null };
        case AUTH_SIGN_OUT:
            return { isSignedIn: false, error: action.payload };
        case AUTH_ERROR:
            return { isSignedIn: false, error: action.payload };
        default:
            return state;
    }
};