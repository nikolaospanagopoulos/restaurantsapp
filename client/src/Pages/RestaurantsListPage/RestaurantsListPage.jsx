
import React, { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'

//import action
import {getRestaurantList} from '../../Actions/RestaurantActions/RestaurantActions'

//import custom loading and message component
import Loader from '../../Components/Loading/Loader'
import Message from '../../Components/Message/Message'


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
              {loading ? <Loader/> : error ? <Message> {error} </Message> : (
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
