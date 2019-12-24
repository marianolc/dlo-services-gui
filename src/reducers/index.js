import {combineReducers} from 'redux';

import loginReducer from './loginReducer';
import activeViewReducer from './activeViewReducer';
import {listReducer, viewReducer} from './CrudReducer';

export default combineReducers({
    sessionStatus: loginReducer,
    viewStatus: activeViewReducer,
    listData: listReducer,
    viewData: viewReducer
});
