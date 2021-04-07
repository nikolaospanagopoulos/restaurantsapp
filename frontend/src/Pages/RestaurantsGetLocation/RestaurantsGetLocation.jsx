import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getRestaurantLocation} from '../../Actions/RestaurantActions/RestaurantLocationAction'
import Restaurant from '../../Components/Restaurant/Restaurant'
import Loader from '../../Components/Loading/Loader'
import Message from '../../Components/Message/Message'
import './RestaurantsGetLocation.css'
const RestaurantsGetLocation = ({match}) => {

    const dispatch = useDispatch()

const zipcode = match.params.zipcode
const distance = match.params.distance
const restaurantLocation = useSelector(state => state.restaurantLocation)
const {restaurants,error,loading} = restaurantLocation


useEffect(() => {
    dispatch(getRestaurantLocation(zipcode,distance))
},[dispatch,zipcode,distance])


    return ( 
        <div className='restaurant-location-page'>
           {restaurants === undefined && <Message>There are no restaurants found on the selected area</Message>}
            {loading ? <Loader /> : error ? <Message> {error} </Message> : (
                restaurants.map(restaurant => (
                    <div key={restaurant._id}>
                        
                        <Restaurant restaurant={restaurant} />
                    </div>
                ))
            )}
        </div>
     );
}
 
export default RestaurantsGetLocation;