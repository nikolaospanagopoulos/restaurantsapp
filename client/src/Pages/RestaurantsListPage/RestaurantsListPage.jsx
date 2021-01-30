
import React, { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import './RestaurantsListPage.css'
//import action
import {getRestaurantList} from '../../Actions/RestaurantActions/RestaurantActions'

//import custom loading and message component
import Loader from '../../Components/Loading/Loader'
import Message from '../../Components/Message/Message'

//import custom restaurant component
import Restaurant from '../../Components/Restaurant/Restaurant'


const RestaurantsListPage = () => {

    const dispatch = useDispatch()

    //get state from 'redux store
    const restaurantList = useSelector(state => state.restaurantList)
    const {restaurants,loading,error} = restaurantList



    useEffect(() => {
        dispatch(getRestaurantList())
    },[dispatch])
  return (
      <div className='restaurant-list'>
          <div>
              <h1 className='restaurant-list-title'> Our Restaurants </h1>
              </div>
              {loading ? <Loader/> : error ? <Message> {error} </Message> : (
                  <div>
                      {restaurants.map(restaurant => (
                          <div key={restaurant._id}>
                              <Restaurant restaurant={restaurant} />
                          </div>
                          
                      ))}
                  </div>
              )}
          </div>
      
  )
};

export default RestaurantsListPage;
