import React, { useEffect } from "react";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import Dish from "../../Components/Dish/Dish";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDishesList } from "../../Actions/DishesActions/GetRestaurantDishesActions";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import "./RestaurantDishesPage.css";

const RestaurantDishesPage = ({ match, history }) => {
  const restaurantId = match.params.id;

  const restaurantDishes = useSelector((state) => state.restaurantDishes);
  const { dishes, error, loading } = restaurantDishes;

  const loginInfo = useSelector((state) => state.loginInfo);
  const { loading: loadingLoginInfo, success, user } = loginInfo;

  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { restaurant, loading: restaurantLoading } = restaurantDetails;

  console.log(restaurant);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(getRestaurantDishesList(restaurantId));
    dispatch(getRestaurantDetails(restaurantId));
  }, [dispatch, restaurantId]);
  console.log(dishes);
  return (
    <div className="dishes-page">
      <h1 className="dishes-title">Dishes</h1>
      <div>
        <div>
          {!restaurantLoading &&
            !loadingLoginInfo &&
            user &&
            restaurant.user === user.data._id && <button onClick={() => history.push(`/restaurants/${restaurantId}/dishes/list`)}>edit</button>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message> {error} </Message>
          ) : (
            dishes.map((dish) => (
              <div key={dish._id} className="dish-list">
                <Dish dish={dish} history={history} match={match} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDishesPage;
