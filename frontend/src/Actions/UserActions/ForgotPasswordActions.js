import axios from 'axios'
import { USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL } from '../../Constants/UserConstants/ForgotUserPasswordConstants'

export const sendPasswordResetRequest = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_PASSWORD_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.post('/api/v1/auth/forgotpassword', { email }, config)

        dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error,
        });
    }
};



export const PasswordResetRequest = (password,token) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESET_PASSWORD_REQUEST })


        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.put(`/api/v1/auth/resetpassword/${token}`, { password }, config)

        dispatch({ type: USER_RESET_PASSWORD_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: error.response.data.error,
        });
    }
};