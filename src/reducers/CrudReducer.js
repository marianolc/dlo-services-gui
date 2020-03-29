import {
  LIST_SUCCESS, LIST_FAILURE,
  VIEW_SUCCESS, VIEW_FAILURE,
  LIST_REQUEST
} from '../actions/types';

const LIST_INITIAL_STATE = {
  data: null,
  error: null
}

export const listReducer = (
  state = LIST_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case LIST_REQUEST:
      return {
        ...state,
        error: null
      };
    case LIST_SUCCESS:
      return {
        data: action.payload,
        error: null
      };
    case LIST_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const VIEW_INITIAL_STATE = {
  data: null,
  error: null
}

export const viewReducer = (
  state = VIEW_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case VIEW_SUCCESS:
      return {
        data: action.payload,
        error: null
      };
    case VIEW_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
