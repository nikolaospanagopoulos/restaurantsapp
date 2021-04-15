import axios from "axios";
import { RESTAURANT_DETAILS_FAIL } from "../../Constants/RestaurantConstants/RestaurantDetailsConstants";

import {RESTAURANT_UPDATE_REQUEST,RESTAURANT_UPDATE_SUCCESS,RESTAURANT_UPDATE_FAIL} from '../../Constants/RestaurantConstants/RestaurantUpdateConstants'

export const updaterRestaurantAction = (restaurant) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/v1/${restaurant._id}`, restaurant);

    dispatch({
      type: RESTAURANT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
