import {
  DISH_DETAILS_FAIL,
  DISH_DETAILS_REQUEST,
  DISH_DETAILS_SUCCESS,
} from "../../Constants/DishesConstants/DishDetailsConstants";

export const dishDetailsReducer = (state = { dish: {data:{orderItems:[]}} }, action) => {
  switch (action.type) {
    case DISH_DETAILS_REQUEST:
      return { loading: true, ...state };
    case DISH_DETAILS_SUCCESS:
      return { loading: false, dish: action.payload };
    case DISH_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
