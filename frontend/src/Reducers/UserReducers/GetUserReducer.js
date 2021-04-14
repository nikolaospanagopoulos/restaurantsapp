import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../../Constants/UserConstants/GetUserConstants";

export const getUserReducer = (state = { user: { data: {} } }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true, ...state };
    case GET_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
