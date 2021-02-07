import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import "./RestaurantDetailsPage.css";
const RestaurantDetailsPage = ({ match }) => {
  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { restaurant, error, loading } = restaurantDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantDetails(match.params.id));
  }, [dispatch, match]);
  console.log(restaurant);
  return (
    <div>
      <div className="restaurant-details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message> {error} </Message>
        ) : (
          <div>
            <h2> {restaurant.name} </h2>
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

            {restaurant.dishes.map((dish) => (
              <div key={dish._id}>
                <h3> {dish.name} </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
