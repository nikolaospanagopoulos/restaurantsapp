import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Restaurant from "../../Components/Restaurant/Restaurant";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import './RestaurantsPage.css'
import {
  getRestaurantListByType,
} from "../../Actions/RestaurantActions/RestaurantListActions";
const RestaurantsPage = () => {
  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantListByType(null));
  }, [dispatch]);
  console.log(restaurants);

  const getRestaurantsByGivenType = (type) => {
    dispatch(getRestaurantListByType(type));
  };
  return (
    <div>
      <div className='sorting-buttons'>
        <button onClick={() => getRestaurantsByGivenType("vegan")}>
          Vegan
        </button>
        <button onClick={() => getRestaurantsByGivenType("vegetarian")}>
          Vegetarian
        </button>
        <button onClick={() => getRestaurantsByGivenType("fusion")}>
          Fusion
        </button>
        <button onClick={() => getRestaurantsByGivenType("traditional")}>
          Traditional
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div>
          {restaurants.data.map((restaurant) => (
            <div key={restaurant._id}>
              <Restaurant restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
