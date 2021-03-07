import React, { useEffect } from "react";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import Dish from "../../Components/Dish/Dish";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDishesList } from "../../Actions/DishesActions/GetRestaurantDishesActions";
import "./RestaurantDishesPage.css";

const RestaurantDishesPage = ({ match,history }) => {
  const restaurantId = match.params.id;

  const restaurantDishes = useSelector((state) => state.restaurantDishes);
  const { dishes, error, loading } = restaurantDishes;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantDishesList(restaurantId));
  }, [dispatch, restaurantId]);
  console.log(dishes)
  return (
    <div className="dishes-page">
      <h1 className="dishes-title">Dishes</h1>
      <div>
        <div>
          
          {loading ? <Loader /> : error ? <Message> {error} </Message> : (
            dishes.map((dish) => (
              <div key={dish._id} className='dish-list'>
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
