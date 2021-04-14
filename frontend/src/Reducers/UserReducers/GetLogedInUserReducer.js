import {
  USER_LOGIN_INFO_FAIL,
  USER_LOGIN_INFO_REQUEST,
  USER_LOGIN_INFO_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
} from "../../Constants/UserConstants/LogedInUserInfoConstants";
import { USER_LOGOUT } from "../../Constants/UserConstants/LoginConstants";
export const loginInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_INFO_REQUEST:
      return { loading: true, user: { ...state }, success: false };
    case USER_LOGIN_INFO_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_LOGIN_INFO_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
