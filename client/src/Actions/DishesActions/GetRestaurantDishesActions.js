import axios from "axios";
import {
  RESTAURANT_DISHES_FAIL,
  RESTAURANT_DISHES_SUCCESS,
  RESTAURANT_DISHES_REQUEST,
} from "../../Constants/DishesConstants/GetRestaurantDishesConstants";

export const getRestaurantDishesList = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DISHES_REQUEST });
    const { data } = await axios.get(
      `/api/v1/restaurants/${restaurantId}/dishes`
    );

    dispatch({ type: RESTAURANT_DISHES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_DISHES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
