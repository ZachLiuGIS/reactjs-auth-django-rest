import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css"
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";

import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import reducers from "./reducers";
import App from "./components/App";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById("root"));
