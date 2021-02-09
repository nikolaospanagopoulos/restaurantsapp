import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import {Link} from 'react-router-dom'
import "./RestaurantDetailsPage.css";
const RestaurantDetailsPage = ({ match,history }) => {

const restaurantId = match.params.id

  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { restaurant, error, loading } = restaurantDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantDetails(restaurantId));
  }, [dispatch, match,restaurantId]);

  const jumpToDishPage = (e) => {
    e.preventDefault();
    history.push(`/restaurants/${restaurantId}/dishes`)
  }

  return (
    <div>
      <div className="restaurant-details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message> {error} </Message>
        ) : (
          <div>
            <div>
            <h2> {restaurant.name} </h2>
            <button className='order-button' onClick={jumpToDishPage}> Order Now </button>
            </div>
            
            <div className="restaurant-images grid-item">
              <img src={restaurant.photo} alt="dishes" />
              <img src={restaurant.photo2} alt="dishes" />
            </div>
            <div className="restaurant-details-card">
              <h4> {restaurant.description} </h4>
              <h4>Email: {restaurant.email}</h4>
              <h4>Phone Number: {restaurant.phone}</h4>
              <h4>Website: {restaurant.website}</h4>
              <h5> {restaurant.location.city} </h5>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
