import {
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_CREATE_RESET,
} from "../../Constants/RestaurantConstants/RestaurantCreateConstants";

export const restaurantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_REQUEST:
      return { loading: true };
    case RESTAURANT_CREATE_SUCCESS:
      return { loading: false, restaurant: action.payload ,success:true};
    case RESTAURANT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_CREATE_RESET:
      return {}; 
    default: return state  
  }
};
