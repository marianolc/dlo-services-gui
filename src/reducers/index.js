import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import loadingReducer from "./loadingReducer";
import crudReducer from "./CrudReducer";

export default combineReducers({
  auth: loginReducer,
  crudData: crudReducer,
  loading: loadingReducer,
});
