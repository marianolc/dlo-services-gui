const INITIAL_STATE = {
    waitingRequest: false,
    waitingUpdate: false,
    updateOk: false
};

const loadingReducer = (state = INITIAL_STATE, action) => {
    const { type } = action;
    const matches = /(.*)_(UPDATE|DELETE|REQUEST|SUCCESS|FAILURE)/.exec(type);
    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) return state;
    const [, , requestState] = matches;
    return {
        ...state,
        // Store whether a request is happening at the moment or not
        // e.g. will be true when receiving GET_TODOS_REQUEST
        //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
        waitingUpdate: requestState === 'UPDATE',
        updateOk: state.waitingUpdate && requestState === 'OK',
        waitingRequest: requestState === 'REQUEST'
    };
};

export default loadingReducer;
