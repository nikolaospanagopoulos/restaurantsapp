import axios from 'axios'

import {
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL
} from "../../Constants/OrderConstants/OrderDeliveredConstants";

export const deliverOrder = (order) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `/api/v1/orders/${order._id}/deliver`, {},
            config
        );

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.error,
        });
    }
};
