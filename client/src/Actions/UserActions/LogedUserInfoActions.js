
  import axios from "axios";
import { USER_LOGIN_INFO_FAIL, USER_LOGIN_INFO_REQUEST, USER_LOGIN_INFO_SUCCESS } from "../../Constants/UserConstants/LogedInUserInfoConstants";

export const loginInfoAction = () => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_INFO_REQUEST,
      });
  
      
  
      const { data } = await axios.get(
        "/api/v1/auth/me"
      );
  
      dispatch({
        type: USER_LOGIN_INFO_SUCCESS,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: USER_LOGIN_INFO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  