import axios from "axios";
import {
  RESTAURANT_DETAILS_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantDetailsConstants";

export const getRestaurantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants/${id}`);

    dispatch({ type: RESTAURANT_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: RESTAURANT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
