import axios from "axios";
import { RESTAURANT_DELETE_FAIL, RESTAURANT_DELETE_REQUEST, RESTAURANT_DELETE_SUCCESS } from "../../Constants/RestaurantConstants/RestaurantDeleteConstants";


export const getRestaurantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DELETE_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants/${id}`);

    dispatch({ type: RESTAURANT_DELETE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error
    });
  }
};

