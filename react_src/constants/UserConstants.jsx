var BASE_URL = 'http://localhost:8000/';

var UserConstants = {
    BASE_URL: BASE_URL,
    LOGIN_URL: BASE_URL + 'rest-auth/login/',
    SIGNUP_URL: BASE_URL + 'rest-auth/registration/',
    USER_DETAIL_URL: BASE_URL + 'rest-auth/user/',
    PASSWORD_CHANGE_URL: BASE_URL + 'rest-auth/password/change/',
    PASSWORD_RESET_URL: BASE_URL + 'rest-auth/password/reset/',

    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    LOAD_USER_DETAIL: 'LOAD_USER_DETAIL'
};

export default UserConstants;