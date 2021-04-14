import { ADD_REVIEW_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_RESET, ADD_REVIEW_SUCCESS } from '../../Constants/ReviewConstants/AddReviewConstants'

export const AddaReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return { loading: true }
        case ADD_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case ADD_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case ADD_REVIEW_RESET:
            return {}
        default:
            return state
    }
}