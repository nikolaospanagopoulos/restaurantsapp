import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
} from "../../Constants/UserConstants/GetUserListConstants";

export const getUsersReducer = (
  state = {
    users: {
      data: [],
      pagination: { next: Number, previous: Number },
      count: Number,
    },
  },
  action
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: {} };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};
