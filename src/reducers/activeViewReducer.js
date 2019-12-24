export default (
    state = {
        previousView: "",
        activeView: "",
        activeViewId: null
    },
    action
) => {
    if (action.type === "CHANGE_VIEW")
        return {
            previousView: state.activeView,
            activeView: action.payload.viewName,
            activeViewId: action.payload.viewId
        };
    return state;
};
