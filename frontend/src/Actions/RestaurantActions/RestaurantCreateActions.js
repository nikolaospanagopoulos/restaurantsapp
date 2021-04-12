
import axios from 'axios'
import {
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantCreateConstants";
const randomNumber = Math.random()
export const createRestaurant = () => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_CREATE_REQUEST });
    const { data } = await axios.post(`/api/v1/restaurants/`, {
      name: `sample ${randomNumber}`,
      description: `sample description `,
      image: "no_image.jpg",
      phone: 'sample phone',
      phone:'sample phone',
      email:'sample@email.gr',
      address:'32 Germanou Patras'

    });

    dispatch({
      type: RESTAURANT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_CREATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
