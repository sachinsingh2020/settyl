import { server } from '../store'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });

        const { data } = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'loginSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data.message });
    }
}
export const register = (firstName, lastName, email, password) => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' });
        const { data } = await axios.post(`${server}/register`, { firstName, lastName, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        // console.log(data);
        dispatch({ type: 'registerSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
}

export const isUserLoggedIn = () => async dispatch => {
    try {
        dispatch({ type: 'isUserLoggedInRequest' });
        const { data } = await axios.get(`${server}/check`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'isUserLoggedInSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'isUserLoggedInFail', payload: error.response.data.message });
    }
}

export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutRequest' });
        const { data } = await axios.get(`${server}/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'logoutSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
}

export const getMyDetails = () => async dispatch => {
    try {
        dispatch({ type: 'getMyDetailsRequest' });
        const { data } = await axios.get(`${server}/me`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'getMyDetailsSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getMyDetailsFail', payload: error.response.data.message });
    }
}

export const getAllUsers = (keyword = "") => async dispatch => {
    try {
        dispatch({ type: 'getAllUsersRequest' });
        let link = "";
        link = `${server}/allusers?keyword=${keyword}`
        const { data } = await axios.get(link, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'getAllUsersSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getAllUsersFail', payload: error.response.data.message });
    }
}