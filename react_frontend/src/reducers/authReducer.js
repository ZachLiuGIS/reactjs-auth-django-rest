import { AuthTypes } from "../constants/actionTypes";

export default function(state = {}, action) {
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, error: "", authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, error: "", authenticated: false, token: null};
        case AuthTypes.ERROR:
            return { ...state, error: action.payload};
        case AuthTypes.USER_PROFILE:
            return { ...state, user: action.payload};
    }
    return state;
}