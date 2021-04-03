import {
  DISH_CREATE_FAIL,
  DISH_CREATE_REQUEST,
  DISH_CREATE_RESET,
  DISH_CREATE_SUCCESS,
} from "../../Constants/DishesConstants/DishCreateConstants";

export const dishCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISH_CREATE_REQUEST:
      return { loading: true };
    case DISH_CREATE_SUCCESS:
      return { loading: false, success: true, dish: action.payload };
    case DISH_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DISH_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
