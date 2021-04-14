import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_RESET,
  GET_ORDERS_SUCCESS,
} from "../../Constants/OrderConstants/GetAllOrdersConstants";

export const getOrdersReducer = (
  state = { orders:{data:[],pagination:{next:Number,previous:Number}}}, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true, orders: {} };
    case GET_ORDERS_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case GET_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};
