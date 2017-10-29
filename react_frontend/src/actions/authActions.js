import axios from "axios";
import history from "../utils/historyUtils";
import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";

import { getUserToken } from "../utils/authUtils";

export function authLogin(token) {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
}

function authError(error) {
    return {
        type: AuthTypes.ERROR,
        payload: error
    }
}

export function loginUser(username, password) {
    return function(dispatch) {
        const loginUrl = AuthUrls.LOGIN;

        axios.post(loginUrl, {
            username,
            password
        }).then((response) => {
            // If request is good...
            // Update state to indicate user is authenticated
            const token = response.data.key;
            dispatch(authLogin(token));

            // Save the JWT token
            localStorage.setItem("token", token);

            // redirect to the route '/feature'
            history.push("/");
        })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                dispatch(authError(error.response.data.error));
            });
    }
}

export function logoutUser() {
    localStorage.removeItem("token");
    return {
        type: AuthTypes.LOGOUT
    };
}

export function signupUser(formValues) {
    return function (dispatch) {
        const signupUrl = AuthUrls.SIGNUP;

        axios.post(signupUrl, formValues)
            .then((response) => {
                // If request is good...
                // Update state to indicate user is authenticated
                dispatch(authLogin());

                // Save the JWT token
                localStorage.setItem("token", response.data.key);

                // redirect to the route '/feature'
                history.push("/");
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                dispatch(authError(error.response.data.error));
            });
    }
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

export function changePassword(formValues) {
    return function (dispatch, getState) {
        const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;

        const token = getUserToken(getState());

        if (token) {
            axios.post(changePasswordUrl, formValues, {
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
                    console.log(error);
                    // TODO: send notification and redirect
                });
        }
    }
}