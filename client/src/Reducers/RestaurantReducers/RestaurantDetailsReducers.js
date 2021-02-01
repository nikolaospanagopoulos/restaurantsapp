import {
  RESTAURANT_DETAILS_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantDetailsConstants";

export const restaurantDetailsReducer = (
  state = { restaurant: {reviews:[]} },
  action
) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case RESTAURANT_DETAILS_SUCCESS:
      return { loading: false, restaurant: action.payload };
    case RESTAURANT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
