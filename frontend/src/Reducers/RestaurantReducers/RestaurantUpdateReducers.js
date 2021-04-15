import {RESTAURANT_UPDATE_REQUEST,RESTAURANT_UPDATE_SUCCESS,RESTAURANT_UPDATE_FAIL,RESTAURANT_UPDATE_RESET} from '../../Constants/RestaurantConstants/RestaurantUpdateConstants'

export const restaurantUpdateReducer = (state = { restaurant: {} }, action) => {
    switch (action.type) {
      case RESTAURANT_UPDATE_REQUEST:
        return { loading: true };
      case RESTAURANT_UPDATE_SUCCESS:
        return { loading: false, success: true, restaurant: action.payload };
      case RESTAURANT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case RESTAURANT_UPDATE_RESET:
        return { restaurant: {} };
      default:
        return state;
    }
  };
  