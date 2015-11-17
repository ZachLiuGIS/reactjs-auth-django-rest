import when from 'when';
import request from 'reqwest';
import UserConstants from '../constants/UserConstants';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

class AuthService {
    login(username, password) {
        console.log("login with");
        console.log(username, password);
        return this.handleAuth(
            when(request({
                url: UserConstants.LOGIN_URL,
                method: 'POST',
                type: 'json',
                data: {
                    username: username,
                    password: password
                }
            }))
        );
    }

    getUserData(token) {
        return (when(request({
            url: UserConstants.USER_DETAIL_URL,
            method: 'GET',
            type: 'json',

            // add Authorization header for api authentication
            headers: {
                'Authorization': 'Token ' + UserStore.token
            }
        })).then(function(data) {
            console.log(data);
            UserActions.loadUserDetail(data);
        }));
    }

    logout() {
        UserActions.logoutUser();
    }

    signup(email, username, password1, password2) {
        console.log(password1, password2);
        return this.handleAuth(when(request({
            url: UserConstants.SIGNUP_URL,
            method: 'POST',
            type: 'json',
            data: {
                email: email,
                username: username,
                password1: password1,
                password2: password2
            }
        })));
    }

    change_password(new_password1, new_password2) {
        return (when(request({
            url: UserConstants.PASSWORD_CHANGE_URL,
            method: 'POST',
            type: 'json',

            // add Authorization header for api authentication
            headers: {
                'Authorization': 'Token ' + UserStore.token
            },
            data: {
                new_password1: new_password1,
                new_password2: new_password2
            }
        })).then(function(data) {
            console.log(data);
            alert('password changed successful');
            return true;
        }));
    }

    reset_password(email) {
        return (when(request({
            url: UserConstants.PASSWORD_RESET_URL,
            method: 'POST',
            type: 'json',

            data: {
                email: email
            }
        })).then(function(data) {
            console.log(data);
            alert('password reset email sent');
            return true;
        }));
    }

    handleAuth(loginPromise) {
        return loginPromise.then(
            function(data) {
                console.log(data); //Success
                var token = data.key;
                UserActions.loginUser(token);
                return true;
            }
        )
    }
}

export default new AuthService()