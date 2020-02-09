import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from '../actions/types';
import axios from 'axios';
import setAlert from './alert';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const register = (user) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email: user.email,
        name: user.name,
        password: user.password
    });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.message, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }

}

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Login User
export const login = (user) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email: user.email,
        password: user.password
    });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.message, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }

}

// Logout User
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: LOGOUT
    });
}