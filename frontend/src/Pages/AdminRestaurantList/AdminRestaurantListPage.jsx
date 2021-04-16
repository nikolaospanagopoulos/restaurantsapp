import React, { useEffect } from "react";
import { getRestaurantList } from "../../Actions/RestaurantActions/RestaurantListActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { Link, useHistory } from "react-router-dom";
import { deleteRestaurantAction } from "../../Actions/RestaurantActions/RestaurantDeleteActions";
import { RESTAURANT_DELETE_RESET } from "../../Constants/RestaurantConstants/RestaurantDeleteConstants";
const AdminRestaurantListPage = ({ history }) => {
  const dispatch = useDispatch();

  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;

  const deleteRestaurant = useSelector((state) => state.deleteRestaurant);
  const {
    success: successDelete,
    error: errorDelete,
    loading: loadingDelete,
  } = deleteRestaurant;

  const loginInfo = useSelector((state) => state.loginInfo);
  const { user, success: successUser } = loginInfo;

  const deleteHandler = (id) => {
    dispatch(deleteRestaurantAction(id))
  }
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: RESTAURANT_DELETE_RESET });
    } else {
      if (successUser && user.data.role !== "admin") {
        history.push("/login");
     
      }else {
        
        dispatch(getRestaurantList());
      }
    }
   
  }, [dispatch, successUser, user, history,successDelete]);
  return (
    <div>
      {error ? (
        <Message> {error} </Message>
      ) : loading ? (
        <Loader />
      ) : loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <table className="dishes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              
            </tr>
          </thead>
          <tbody>
            {restaurants.data.map((restaurant) => (
              <tr key={restaurant._id}>
                <td> {restaurant._id} </td>
                <td> {restaurant.name} </td>
                <td>{restaurant.email}</td>

                <td>
                  {" "}
                  <Link to={`/restaurants/${restaurant._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteHandler(restaurant._id)}>
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

export default AdminRestaurantListPage;
