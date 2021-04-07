import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../../Constants/UserConstants/UserUpdateConstants";

export const updateUserReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true,...state };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user:action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
