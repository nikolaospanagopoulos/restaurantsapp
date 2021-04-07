import {
  RESTAURANT_LOCATION_FAIL,
  RESTAURANT_LOCATION_REQUEST,
  RESTAURANT_LOCATION_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantGeolocationConstants";

export const restaurantLocationReducer = (
  state = { restaurants: [] },
  action
) => {
  switch (action.type) {
    case RESTAURANT_LOCATION_REQUEST:
      return { loading: true, restaurants: [] };
    case RESTAURANT_LOCATION_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case RESTAURANT_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
