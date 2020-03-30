import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import loadingReducer from './loadingReducer';
import { listReducer, viewReducer } from './CrudReducer';

export default combineReducers({
    auth: loginReducer,
    listData: listReducer,
    viewData: viewReducer,
    loading: loadingReducer
});
