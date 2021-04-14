import axios from "axios";

import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from "../../Constants/UserConstants/GetUserListConstants"; 

export const getUserListAction = (page=1) => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/users?limit=25&page=${page}`);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.error,
    });
  }
};
