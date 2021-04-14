import React from "react";
import "./Restaurant.css";
import { Link } from "react-router-dom";
import { removeWord } from "../../Utilis/Regex";
import Rating from '../../Components/Rating/Rating'


const Restaurant = ({ restaurant }) => {
 const sum = ((restaurant.reviews).reduce( (acc, item) => acc + item.rating ,
   0))
  const avg = sum/restaurant.reviews.length  
  console.log(sum)
  return (
    <div className="restaurant-card">
      <Link to={`/restaurants/${restaurant._id}`} className="restaurant-link">
        <h3 className="restaurant-name"> {restaurant.name} </h3>
        <h4 className="restaurant-description"> {restaurant.description} </h4>
        <h5 className="restaurant-address">
          {" "}
          {restaurant.location.street} {restaurant.location.streetNumber}{" "}
          {removeWord(restaurant.location.city)}{" "}
        </h5>
        <Rating value={avg}/>
      </Link>
    </div>
  );
};

export default Restaurant;
