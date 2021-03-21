import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
} from "../../Constants/UserConstants/UpdateUserDataConstants";

export const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true, success: false };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
      case UPDATE_PROFILE_RESET:
      return { };
    default:
      return state;
  }
};
