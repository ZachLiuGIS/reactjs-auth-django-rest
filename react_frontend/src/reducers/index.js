import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifReducer } from 'redux-notifications';

import authReducer from "./authReducer";

const rootReducer = combineReducers({
    form: formReducer,
    notifs: notifReducer,
    auth: authReducer
});

export default rootReducer;
