import axios from 'axios'
import { ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL } from '../../Constants/ReviewConstants/AddReviewConstants'

export const addReviewAction = (restaurantId, review) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_REVIEW_REQUEST
        })

        await axios.post(`/api/v1/restaurants/${restaurantId}/reviews`, review)

        dispatch({
            type: ADD_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.error,
        });
    }
};
