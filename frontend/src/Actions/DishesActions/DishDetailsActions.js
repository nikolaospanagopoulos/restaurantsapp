import axios from "axios";
import {
  DISH_DETAILS_FAIL,
  DISH_DETAILS_REQUEST,
  DISH_DETAILS_SUCCESS,
} from "../../Constants/DishesConstants/DishDetailsConstants";
export const getDishDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISH_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/dishes/${id}`);

    dispatch({
      type: DISH_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISH_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
