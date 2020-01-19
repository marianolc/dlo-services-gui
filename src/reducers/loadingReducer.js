
const INITIAL_STATE = {
}

const loadingReducer = (state = INITIAL_STATE, action) => {
    const { type } = action;
    const matches = /(.*)_(DELETE|REQUEST|SUCCESS|FAILURE)/.exec(type);

    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) return state;
    const [, requestName, requestState] = matches;
    return {
        ...state,
        // Store whether a request is happening at the moment or not
        // e.g. will be true when receiving GET_TODOS_REQUEST
        //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
        [requestName]: requestState === 'REQUEST',
        [requestName + '_DELETE']: requestState === 'DELETE',
    };
};

export default loadingReducer;