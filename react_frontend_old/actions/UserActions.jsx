import AppDispatcher from '../dispatchers/AppDispatcher';
import UserConstants from '../constants/UserConstants';
import History from '../services/History';

export default {
    loginUser: (token) => {
        //var savedToken = localStorage.getItem('user_token');

        AppDispatcher.dispatch({
            actionType: UserConstants.LOGIN_USER,
            token: token
        });

        localStorage.setItem('user_token', token);

        // this won't work with onEnter hook in Routes
        History.replaceState({}, '/dashboard');
    },

    logoutUser: () => {
        History.replaceState(null, '/');
        localStorage.removeItem('user_token');
        AppDispatcher.dispatch({
            actionType: UserConstants.LOGOUT_USER
        })
    },

    loadUserDetail: (data) => {
        AppDispatcher.dispatch({
            actionType: UserConstants.LOAD_USER_DETAIL,
            user: data
        });
    }
}