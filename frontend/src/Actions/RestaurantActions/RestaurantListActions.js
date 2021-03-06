import axios from "axios";
import {
  RESTAURANT_LIST_FAIL,
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
} from "../../Constants/RestaurantConstants/RestaurantListConstants";

export const getRestaurantList = (page=1) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants?limit=4&page=${page}`);

    dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.error 
          ? error.response.data.error
          : error.error 
    });
  }
};  
  
export const getRestaurantListByOwner = (owner) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants?user=${owner}`);

    dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.error 
          ? error.response.data.error
          : error.error 
    });
  }
};  
  

export const getRestaurantListByType = (type) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/restaurants?${!type ? '' : `${type}=true`}`);

    dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LIST_FAIL,
      payload:
        error.response && error.response.data.error 
          ? error.response.data.error
          : error.error 
    });
  }
};  
  