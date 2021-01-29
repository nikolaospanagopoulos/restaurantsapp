
import React, { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'

//import action
import {getRestaurantList} from '../../Actions/RestaurantActions/RestaurantActions'


const RestaurantsListPage = () => {

    const dispatch = useDispatch()

    //get state from 'redux store
    const restaurantList = useSelector(state => state.restaurantList)
    const {restaurants,loading,error} = restaurantList



    useEffect(() => {
        dispatch(getRestaurantList())
    },[dispatch])
  return (
      <div>
          <div>
              <h1> Our Restaurants </h1>
              </div>
              {loading ? <h1>Loading...</h1> : error ? <h1> {error} </h1> : (
                  <div>
                      {restaurants.map(restaurant => (
                          <h1> {restaurant.name} </h1>
                      ))}
                  </div>
              )}
          </div>
      
  )
};

export default RestaurantsListPage;
