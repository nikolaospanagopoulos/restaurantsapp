import {
    ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL
  } from "../../Constants/OrderConstants/OrderDetailsConstants";
  import axios from "axios";
  export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/orders/${id}`);
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };
  