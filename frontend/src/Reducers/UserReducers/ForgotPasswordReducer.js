import { USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_FORGOT_PASSWORD_RESET, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL, USER_RESET_PASSWORD_RESET } from '../../Constants/UserConstants/ForgotUserPasswordConstants'

export const ForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true }
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case USER_FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        case USER_FORGOT_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}

export const ResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true }
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        case USER_RESET_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}