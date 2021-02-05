import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import "./RestaurantDetails.css";
const RestaurantDetailsPage = ({ match }) => {
  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { restaurant, error, loading } = restaurantDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantDetails(match.params.id));
  }, [dispatch, match]);
  console.log(restaurant.location);
  return (
    <div>
      <div className="restaurant-details">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1> {error} </h1>
        ) : (
          <div>
            <h2> {restaurant.name} </h2>
            <h4> {restaurant.description} </h4>
            <h4>Email: {restaurant.email}</h4>
            <h4>Phone Number: {restaurant.phone}</h4>
            
            <h5> {restaurant.location.city} </h5>
            <img src={restaurant.photo} alt=""/>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
