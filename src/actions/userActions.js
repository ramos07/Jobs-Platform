import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants";
import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // Headers to send with request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Make request to server and get the response data
        const { data } = await axios.post('https://divercity-test.herokuapp.com/login', { username, password }, config)

        // Dispatch the user login success after making the request
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT,
    })
}

export const register = (username, password, name) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        // Header to send with the request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Make request to server and get the response data
        const { data } = await axios.post(
            'https://divercity-test.herokuapp.com/register',
            { username, password, name },
            config
        )

        // Dispatch user register success after making the request
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
        // Login in the user as well after registering
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // Set user data to local storage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}