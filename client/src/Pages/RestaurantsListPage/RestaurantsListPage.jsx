import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RestaurantsListPage.css";

//import form to find restaurants close to the zipcode provided
import LocationForm from "../../Components/LocationForm/LocationForm";

//import action
import { getRestaurantList } from "../../Actions/RestaurantActions/RestaurantListActions";

//import custom loading and message component
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";

//import custom restaurant component
import Restaurant from "../../Components/Restaurant/Restaurant";


const RestaurantsListPage = ({ history }) => {
  const dispatch = useDispatch();

  //get state from 'redux store
  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;

  useEffect(() => {
    dispatch(getRestaurantList());
  }, [dispatch]);
console.log(restaurants.pagination)
  return (
    <div className="restaurant-list">
      <div>
        <h1 className="restaurant-list-title"> Our Restaurants </h1>
      </div>
      <div className="location-form">
        <LocationForm history={history} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div>
          {/* {(data.data).map((restaurant) => (
            <div key={restaurant._id} className="restaurant-list-restaurants">
              <Restaurant restaurant={restaurant} />
            </div>
          ))} */}
              {
                (restaurants.data).map(restaurant => (
                  <div key={restaurant._id} className="restaurant-list-restaurants">
                  <Restaurant restaurant={restaurant} />
                </div>
      ))
              }
        </div>
      )}
    </div>
  );
};

export default RestaurantsListPage;
