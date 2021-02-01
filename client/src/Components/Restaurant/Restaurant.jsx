import React from "react";
import './Restaurant.css'
import {Link} from 'react-router-dom'

const Restaurant = ({ restaurant,history }) => {
  return (
    <div className='restaurant-card'>
      <Link to={`/restaurants/restaurant/${restaurant._id}`}>
      <h3 className='restaurant-name'> {restaurant.name} </h3>
      <h4 className='restaurant-description'> {restaurant.description} </h4>
      <h5 className='restaurant-address'> {restaurant.location.formattedAddress} </h5>
      </Link>
    </div>
  );
};

export default Restaurant;
