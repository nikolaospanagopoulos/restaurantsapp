import axios from 'axios'
import {RESTAURANT_DELETE_REQUEST,RESTAURANT_DELETE_SUCCESS,RESTAURANT_DELETE_FAIL} from '../../Constants/RestaurantConstants/RestaurantDeleteConstants'
export const deleteRestaurantAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type:RESTAURANT_DELETE_REQUEST
        })
        await axios.delete(`/api/v1/restaurants/${id}`)
        dispatch({
            type:RESTAURANT_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: RESTAURANT_DELETE_FAIL,
            payload:
              error.response && error.response.data.error
                ? error.response.data.error
                : error.error
          });
        }
      };
      
      