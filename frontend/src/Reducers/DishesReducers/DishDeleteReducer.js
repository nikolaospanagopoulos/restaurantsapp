import {
  DISH_DELETE_FAIL,
  DISH_DELETE_REQUEST,
  DISH_DELETE_RESET,
  DISH_DELETE_SUCCESS,
} from "../../Constants/DishesConstants/DishDeleteConstants";

export const dishDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISH_DELETE_REQUEST:
      return { loading: true };
    case DISH_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DISH_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DISH_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
