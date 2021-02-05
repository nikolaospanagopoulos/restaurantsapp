import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getRestaurantLocation} from '../../Actions/RestaurantActions/RestaurantLocationAction'


const RestaurantsGetLocation = ({match}) => {

    const dispatch = useDispatch()

const zipcode = match.params.zipcode
const distance = match.params.distance
const restaurantLocation = useSelector(state => state.restaurantLocation)
const {restaurants,error,loading} = restaurantLocation


useEffect(() => {
    dispatch(getRestaurantLocation(zipcode,distance))
},[dispatch,zipcode,distance])


console.log(restaurants)
    return ( 
        <div>

        </div>
     );
}
 
export default RestaurantsGetLocation;