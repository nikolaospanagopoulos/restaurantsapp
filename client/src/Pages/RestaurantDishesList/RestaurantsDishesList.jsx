import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDishesList } from "../../Actions/DishesActions/GetRestaurantDishesActions";
import { deleteDish } from "../../Actions/DishesActions/DishDeleteActions";
import { createDish } from "../../Actions/DishesActions/DishCreateActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { DISH_DELETE_RESET } from "../../Constants/DishesConstants/DishDeleteConstants";
import { DISH_CREATE_RESET } from "../../Constants/DishesConstants/DishCreateConstants";
import { Link } from "react-router-dom";
import "./RestaurantDishesList.css";
const RestaurantDishesList = ({ match, history }) => {
  const restaurantId = match.params.restaurantId;

  const dispatch = useDispatch();

  const restaurantDishes = useSelector((state) => state.restaurantDishes);
  const { dishes, error, loading } = restaurantDishes;

  const dishCreate = useSelector((state) => state.dishCreate);
  const {
    dish: createdDish,
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = dishCreate;
  const dishDelete = useSelector((state) => state.dishDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = dishDelete;
  useEffect(() => {
    dispatch({ type: DISH_CREATE_RESET });
    if (successCreate) {
      history.push(`/dishes/${createdDish.data._id}/edit`);
    } else {
      dispatch(getRestaurantDishesList(restaurantId));
    }
    if (errorDelete) {
      setTimeout(() => {
        dispatch({ type: DISH_DELETE_RESET });
      }, 2500);
    }
  }, [
    dispatch,
    restaurantId,
    successDelete,
    errorDelete,
    successCreate,
    history,
    createdDish,
  ]);
  const deleteHandler = (id) => {
    const answer = window.confirm("are you sure?");
    if(answer){
      dispatch(deleteDish(id));
    }
    else{
      return
    }
  };

  const createHandler = () => {
    dispatch(createDish(restaurantId));
  };

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
      {loadingCreate && <Loader />}
      {errorCreate && <Message> {errorCreate} </Message>}
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
              <th>AVAILABLE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish._id}>
                <td> {dish._id} </td>
                <td> {dish.name} </td>
                <td>{dish.price}</td>
                <td>
                  {" "}
                  {dish.vegan
                    ? "vegan"
                    : dish.vegetarian
                    ? "vegetarian"
                    : "normal"}
                </td>
                <td> {dish.available}</td>
                <td>
                  {" "}
                  <Link to={`/dishes/${dish._id}/edit`}>
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
