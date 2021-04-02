import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDishesList } from "../../Actions/DishesActions/GetRestaurantDishesActions";
import { getRestaurantDetails } from "../../Actions/RestaurantActions/RestaurantDetailsActions";
import { deleteDish } from "../../Actions/DishesActions/DishDeleteActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import {DISH_DELETE_RESET} from '../../Constants/DishesConstants/DishDeleteConstants'
import { Link } from "react-router-dom";
import "./RestaurantDishesList.css";
const RestaurantDishesList = ({ match, history }) => {
  const restaurantId = match.params.restaurantId;

  const dispatch = useDispatch();

  const restaurantDishes = useSelector((state) => state.restaurantDishes);
  const { dishes, error, loading } = restaurantDishes;

  const dishDelete = useSelector((state) => state.dishDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = dishDelete;
  useEffect(() => {
    if(errorDelete){
      setTimeout(() => {
        dispatch({type:DISH_DELETE_RESET})
      },2500)
    }
    dispatch(getRestaurantDishesList(restaurantId));
  }, [dispatch, restaurantId, successDelete,errorDelete]);
  const deleteHandler = (id) => {
    window.confirm("are you sure?");
    dispatch(deleteDish(id));
  };

  const createHandler = (dish) => {};
  return (
    <div className="users-title">
      <h1>Tours</h1>
      <div>
        <button onClick={() => createHandler()}>
          {" "}
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message> {errorDelete} </Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="red"> {error} </Message>
      ) : (
        <table className="dishes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td> {dish._id} </td>
                <td> {dish.name} </td>
                <td>{dish.price}</td>
                <td> {dish.category}</td>

                <td>
                  {" "}
                  <Link to={`/dish/${dish._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteHandler(dish._id)}>
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RestaurantDishesList;
