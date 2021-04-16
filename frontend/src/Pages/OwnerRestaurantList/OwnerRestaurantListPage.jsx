import React, { useEffect } from "react";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRestaurantListByOwner } from "../../Actions/RestaurantActions/RestaurantListActions";
const OwnerRestaurantListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;

  const loginInfo = useSelector((state) => state.loginInfo);
  const { user, success: successUser } = loginInfo;

  const userId = match.params.id;
  useEffect(() => {
    if (successUser && user.data.role !== "owner") {
      history.push("/login");
    } else {
      dispatch(getRestaurantListByOwner(userId));
    }
  }, [dispatch, successUser, user, history, userId]);
    console.log(restaurants)
  return (
    <div>
      {error ? (
        <Message> {error} </Message>
      ) : loading ? (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerRestaurantListPage;
