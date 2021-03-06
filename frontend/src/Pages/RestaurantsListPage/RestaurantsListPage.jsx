import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Components/Pagination/Pagination";
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

  const [nextPage, setNextPage] = useState(Number);
  const [previousPage, setPreviousPage] = useState(Number);
  useEffect(() => {
    dispatch(getRestaurantList());
  }, [dispatch]);

  useEffect(() => {
    if (restaurants.pagination) {
      if (restaurants.pagination.next) {
        setNextPage(restaurants.pagination.next.page);
      } else if (!restaurants.pagination.next) {
        setNextPage(null);
      }

      if (restaurants.pagination.prev) {
        setPreviousPage(restaurants.pagination.prev.page);
      }
    }
  }, [restaurants.pagination, loading]);

  const pageClick = (pageNum) => {
    dispatch(getRestaurantList(pageNum));
  };

  console.log(nextPage);
  console.log(restaurants);
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
          {restaurants.data.map((restaurant) => (
            <div key={restaurant._id} className="restaurant-list-restaurants">
              <Restaurant restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
      <div className="restaurants-pagination-container">
        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          pageClick={pageClick}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RestaurantsListPage;
