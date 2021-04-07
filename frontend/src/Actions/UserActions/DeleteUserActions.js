import axios from "axios";
import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../../Constants/UserConstants/UserDeleteConstants";

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    await axios.delete(`/api/v1/users/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.error,
    });
  }
};
