import {
  RESTAURANT_DISHES_FAIL,
  RESTAURANT_DISHES_REQUEST,
  RESTAURANT_DISHES_SUCCESS,
} from "../../Constants/DishesConstants/GetRestaurantDishesConstants";

export const GetRestaurantDishesReducer = (state = { dishes: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_DISHES_REQUEST:
      return { loading: true, dishes: [] };
    case RESTAURANT_DISHES_SUCCESS:
      return { loading: false, dishes: action.payload };
    case RESTAURANT_DISHES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
