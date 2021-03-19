import { USER_LOGOUT } from "../../Constants/UserConstants/LoginConstants"

export const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    
}