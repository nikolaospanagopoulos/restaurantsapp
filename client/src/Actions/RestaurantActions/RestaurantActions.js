import axios from "axios";
import {
  RESTAURANT_LIST_FAIL,
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantListConstants";

export const getRestaurantList = () => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST });

    const { data } = await axios.get("/api/v1/restaurants");

    dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
 