import {
  RESTAURANT_LIST_FAIL,
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantListConstants";

export const RestaurantListReducer = (state = { restaurants:{data:[]}}, action) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: {} };
    case RESTAURANT_LIST_SUCCESS:
      return { loading: false, restaurants: action.payload};
    case RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
