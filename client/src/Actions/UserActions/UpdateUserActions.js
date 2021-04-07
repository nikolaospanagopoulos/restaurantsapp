import axios from "axios";
import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../../Constants/UserConstants/UserUpdateConstants";

export const updateUserAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.put(`/api/v1/users/${user._id}`,user,config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload:data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.error,
    });
  }
};
