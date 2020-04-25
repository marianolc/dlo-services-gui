import {
  LIST_SUCCESS,
  LIST_FAILURE,
  VIEW_SUCCESS,
  VIEW_FAILURE,
  VIEW_REQUEST,
  LIST_REQUEST,
  ACCOUNT_SUCCESS,
  ACCOUNTS_SUCCESS,
  CUSTOMER_SUCCESS,
  CUSTOMERS_SUCCESS,
  INVENTORY_FAMILIES_SUCCESS,
  INVENTORY_MODEL_SUCCESS,
  INVENTORY_MODELS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  data: null,
  error: null,
  account: null,
  accounts: [],
  customer: null,
  customers: [],
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
    case CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
        error: null,
      };
    case CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        error: null,
      };
    case ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.payload,
        error: null,
      };
    case ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        error: null,
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
