import axios from "axios";
import { SubmissionError } from 'redux-form';
import history from "../utils/historyUtils";
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

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

            localStorage.setItem("token", token);

            // redirect to the route '/'
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
            // you can login if email verification is turned off.
            // const token = response.data.key;
            // dispatch(authLogin(token));
            // localStorage.setItem("token", token);

            // email need to be verified, so don't login and send user to signup_done page.
            // redirect to signup done page.
            history.push("/signup_done");
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
    return function(dispatch) {
        const token = getUserToken(store.getState());
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
    const token = getUserToken(store.getState());

    if (token) {
        return axios.post(changePasswordUrl, formValues, {
            headers: {
                authorization: 'Token ' + token
            }
        })
            .then((response) => {
                dispatch(notifSend({
                    message: "Password has been changed successfully",
                    kind: "info",
                    dismissAfter: 5000
                }));
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

export function resetPassword(formValues, dispatch, props) {
    const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

    return axios.post(resetPasswordUrl, formValues)
        .then(response => {
            // redirect to reset done page
            history.push("/reset_password_done");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function confirmPasswordChange(formValues, dispatch, props) {
    const { uid, token } = props.match.params;
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const data = Object.assign(formValues, { uid, token });

    return axios.post(resetPasswordConfirmUrl, data)
        .then(response => {
            dispatch(notifSend({
                message: "Password has been reset successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function activateUserAccount(formValues, dispatch, props) {
    const { key } = props.match.params;
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const data = Object.assign(formValues, { key });

    return axios.post(activateUserUrl, data)
        .then(response => {
            dispatch(notifSend({
                message: "Your account has been activated successfully, please log in",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}

export function updateUserProfile(formValues, dispatch, props) {
    const token = getUserToken(store.getState());

    return axios.patch(AuthUrls.USER_PROFILE, formValues, {
        headers: {
            authorization: 'Token ' + token
        }
    })
        .then(response => {
            dispatch(notifSend({
                message: "Your profile has been updated successfully",
                kind: "info",
                dismissAfter: 5000
            }));

            history.push("/profile");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
}
// util functions
function processServerError(error) {
    return  Object.keys(error).reduce(function(newDict, key) {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, {"_error": []});
}