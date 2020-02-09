import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT } from '../actions/types';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const setAuth = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            };
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null
            };
        default:
            return state;
    }
}


export default setAuth;
