import axios from "axios";

import {
  UPDATE_DISH_REQUEST,
  UPDATE_DISH_SUCCESS,
  UPDATE_DISH_RESET,
  UPDATE_DISH_FAIL,
} from "../../Constants/DishesConstants/DishUpdateConstants";

export const updateDish = (dish) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DISH_REQUEST });
    const { data } = await axios.put(`/api/v1/dishes/${dish._id}`, dish);

    dispatch({
      type: UPDATE_DISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
