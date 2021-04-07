import axios from "axios";
import {
  DISH_CREATE_REQUEST,
  DISH_CREATE_SUCCESS,
  DISH_CREATE_FAIL
} from "../../Constants/DishesConstants/DishCreateConstants";

export const createDish = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISH_CREATE_REQUEST });
    const {data} = await axios.post(
      `/api/v1/restaurants/${id}/dishes`,{
        name:'sample dish',
        description:"sample description",
        image:'no_image.jpg',
        price:0,
        available:0,
        vegetarian:true,
        vegan:false
      }
    );

    dispatch({ 
        type: DISH_CREATE_SUCCESS,
        payload:data
    });
  } catch (error) {
    dispatch({
      type: DISH_CREATE_FAIL,
      payload:
      error.response && error.response.data.error 
        ? error.response.data.error
        : error.error 
    });
  }
};
