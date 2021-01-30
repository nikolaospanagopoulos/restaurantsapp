import React from "react";
import './Restaurant.css'


const Restaurant = ({ restaurant }) => {
  return (
    <div className='restaurant-card'>
      <h3 className='restaurant-name'> {restaurant.name} </h3>
      <h4 className='restaurant-description'> {restaurant.description} </h4>
    </div>
  );
};

export default Restaurant;
