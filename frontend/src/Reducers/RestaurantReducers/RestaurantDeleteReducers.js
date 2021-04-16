import { RESTAURANT_DELETE_FAIL, RESTAURANT_DELETE_REQUEST, RESTAURANT_DELETE_RESET, RESTAURANT_DELETE_SUCCESS } from '../../Constants/RestaurantConstants/RestaurantDeleteConstants'


export const deleteRestaurantReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_DELETE_REQUEST:
            return { loading: true }
        case RESTAURANT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case RESTAURANT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_DELETE_RESET:
            return {}
        default:
            return state
    }
}