import axios from "axios";
import {
    RESTAURANT_LOCATION_FAIL,
  RESTAURANT_LOCATION_REQUEST,
  RESTAURANT_LOCATION_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantGeolocationConstants";

export const getRestaurantLocation = (zipcode, distance) => async (
  dispatch
) => {
  try {
    dispatch({ type: RESTAURANT_LOCATION_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants/radius/${zipcode}/${distance}`);

    dispatch({ type: RESTAURANT_LOCATION_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LOCATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
