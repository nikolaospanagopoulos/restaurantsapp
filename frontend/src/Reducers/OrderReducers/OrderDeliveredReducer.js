import { ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,ORDER_DELIVER_RESET } from '../../Constants/OrderConstants/OrderDeliveredConstants'

export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return { loading: true }
        case ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}
