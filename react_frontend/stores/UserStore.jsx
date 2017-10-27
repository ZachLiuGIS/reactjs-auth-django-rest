import UserConstants from '../constants/UserConstants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._token = null;
        this._user = null;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case UserConstants.LOGIN_USER:
                this.setUserToken(action.token);
                break;

            case UserConstants.LOGOUT_USER:
                this.removeUserInfo();
                break;

            case UserConstants.LOAD_USER_DETAIL:
                this.setUserDetail(action.user);
                break;
            default:
                break;
        }
    }

    setUserToken(token) {
        this._token = token;
        this.emitChange();
    }

    setUserDetail(user) {
        this._user = user;
        this.emitChange();
    }

    removeUserInfo() {
        this._user = null;
        this._token = null;
        this.emitChange();
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    isLoggedIn() {
        return !!this._token;
    }
}

export default new UserStore();