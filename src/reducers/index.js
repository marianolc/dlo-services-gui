import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import activeViewReducer from './activeViewReducer';
import loadingReducer from './loadingReducer';
import { listReducer, viewReducer } from './CrudReducer';

export default combineReducers({
    auth: loginReducer,
    viewStatus: activeViewReducer,
    listData: listReducer,
    viewData: viewReducer,
    loading: loadingReducer
});
