import {
  LIST_SUCCESS,
  LIST_FAILURE,
  VIEW_SUCCESS,
  VIEW_FAILURE,
  VIEW_REQUEST,
  LIST_REQUEST,
  INVENTORY_FAMILIES_SUCCESS,
  INVENTORY_MODEL_SUCCESS,
  INVENTORY_MODELS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  data: null,
  error: null,
  inventoryFamilies: [],
  inventoryModels: [],
  inventoryModel: null,
};

const crudReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return {
        ...state,
        error: null,
      };
    case LIST_SUCCESS:
      return {
        data: action.payload,
        error: null,
      };
    case LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case INVENTORY_FAMILIES_SUCCESS:
      return {
        ...state,
        inventoryFamilies: action.payload,
        error: null,
      };
    case INVENTORY_MODELS_SUCCESS:
      return {
        ...state,
        inventoryModels: action.payload,
        error: null,
      };
    case INVENTORY_MODEL_SUCCESS:
      return {
        ...state,
        inventoryModel: action.payload[0].data,
        inventoryFamilies: action.payload[1].data,
        error: null,
      };
    case VIEW_REQUEST:
      return { ...state, error: null };
    case VIEW_SUCCESS:
      return {
        data: action.payload,
        error: null,
      };
    case VIEW_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default crudReducer;
