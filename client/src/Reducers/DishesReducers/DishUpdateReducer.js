import {
  UPDATE_DISH_FAIL,
  UPDATE_DISH_REQUEST,
  UPDATE_DISH_RESET,
  UPDATE_DISH_SUCCESS,
} from "../../Constants/DishesConstants/DishUpdateConstants";

export const dishUpdateReducer = (state = { dish: {} }, action) => {
  switch (action.type) {
    case UPDATE_DISH_REQUEST:
      return { loading: true };
    case UPDATE_DISH_SUCCESS:
      return { loading: false, success: true, dish: action.payload };
    case UPDATE_DISH_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DISH_RESET:
      return { dish: {} };
    default:
      return state;
  }
};
