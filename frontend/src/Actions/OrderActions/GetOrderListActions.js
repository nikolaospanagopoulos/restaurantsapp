import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../../Constants/OrderConstants/GetAllOrdersConstants";
import axios from "axios";

export const getOrderList = (page,id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const { data } = await axios.get(`/api/v1/orders?${id ? `orderItems.restaurant=${id}`: ''}&page=${page}`);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
