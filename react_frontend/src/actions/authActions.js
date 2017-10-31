import axios from "axios";
import { SubmissionError } from 'redux-form';
import history from "../utils/historyUtils";

import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";

export function authLogin(token) {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
}

export function loginUser(formValues, dispatch, props) {
        const loginUrl = AuthUrls.LOGIN;

        return axios.post(loginUrl, formValues).then((response) => {
            // If request is good...
            // Update state to indicate user is authenticated
            const token = response.data.key;
            dispatch(authLogin(token));

            // Save the JWT token
            localStorage.setItem("token", token);

            // redirect to the route '/feature'
            history.push("/");
        }).catch(error => {
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function logoutUser() {
    localStorage.removeItem("token");
    return {
        type: AuthTypes.LOGOUT
    };
}

export function signupUser(formValues, dispatch, props) {
    const signupUrl = AuthUrls.SIGNUP;

    return axios.post(signupUrl, formValues)
        .then((response) => {
            // If request is good...
            // Update state to indicate user is authenticated
            dispatch(authLogin());

            // Save the JWT token
            localStorage.setItem("token", response.data.key);

            // redirect to the route '/'
            history.push("/");
        })
        .catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

function setUserProfile(payload) {
    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
}

export function getUserProfile() {
    return function(dispatch, getState) {
        const token = getUserToken(getState());
        if (token) {
            axios.get(AuthUrls.USER_PROFILE, {
                headers: {
                    authorization: 'Token ' + token
                }
            }).then(response => {
                dispatch(setUserProfile(response.data))
            }).catch((error) => {
                // If request is bad...
                // Show an error to the user
                console.log(error);
                // TODO: send notification and redirect
            });
        }
    };
}

export function changePassword(formValues, dispatch, props) {
    const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;

    // TODO: fix getState outside of redux thunk
    const token = getUserToken(store.getState());

    if (token) {
        return axios.post(changePasswordUrl, formValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
            .then((response) => {
                // TODO: send notification
                // redirect to the route '/profile'
                history.push("/profile");
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
}

// util functions
function processServerError(error) {
    return  Object.keys(error).reduce(function(newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"] = error[key];
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, {});
}