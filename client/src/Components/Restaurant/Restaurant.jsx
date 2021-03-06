import React from "react";
import "./Restaurant.css";
import { Link } from "react-router-dom";

const removeWord = (string) => {
  {
    const uselessWordsArray = ["Municipal", "Municipality", "of", "Unit"];

    const expStr = uselessWordsArray.join("|");
    return string
      .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ")
      .replace(/\s{2,}/g, " ");
  }
};

const Restaurant = ({ restaurant }) => {
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
      </Link>
    </div>
  );
};

export default Restaurant;
