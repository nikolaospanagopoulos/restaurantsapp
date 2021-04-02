import axios from "axios";
import {
  DISH_DELETE_REQUEST,
  DISH_DELETE_SUCCESS,
  DISH_DELETE_FAIL
} from "../../Constants/DishesConstants/DishDeleteConstants";

export const deleteDish = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISH_DELETE_REQUEST });
    await axios.delete(
      `/api/v1/dishes/${id}`
    );

    dispatch({ type: DISH_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: DISH_DELETE_FAIL,
      payload:
      error.response && error.response.data.error 
        ? error.response.data.error
        : error.error 
    });
  }
};
