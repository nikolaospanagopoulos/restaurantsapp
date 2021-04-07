import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantList } from "../../Actions/RestaurantActions/RestaurantListActions";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import Restaurant from "../../Components/Restaurant/Restaurant";
const OwnedREstaurants = ({ match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantList("", userId));
  }, [dispatch, userId]);

  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;
  console.log(restaurants);
  return (
    <div>
      <h1>Owned Restaurants</h1>
      <div>
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
    </div>
  );
};

export default OwnedREstaurants;
