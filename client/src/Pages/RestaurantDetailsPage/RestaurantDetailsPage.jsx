import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getRestaurantDetails} from '../../Actions/RestaurantActions/RestaurantDetailsActions'



const RestaurantDetailsPage = ({match}) => {

const restaurantDetails = useSelector(state => state.restaurantDetails)
const {restaurant,error,loading} = restaurantDetails

const dispatch = useDispatch()
    const restaurantId = match.params.id
    useEffect(() => {
        dispatch(getRestaurantDetails(restaurantId)) 
     },[dispatch,restaurantId,match])
     
    return ( 
        <div>
            <h1 style={{marginTop:'50rem',position:'absolute',color:"black"}}>{restaurant.name}</h1>
        </div>
     );
}
  
export default RestaurantDetailsPage;