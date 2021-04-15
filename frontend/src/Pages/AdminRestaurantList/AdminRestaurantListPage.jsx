import React, { useEffect } from "react";
import { getRestaurantList } from "../../Actions/RestaurantActions/RestaurantListActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { Link, useHistory } from "react-router-dom";
const AdminRestaurantListPage = ({ history }) => {
  const dispatch = useDispatch();

  const restaurantList = useSelector((state) => state.restaurantList);
  const { restaurants, loading, error } = restaurantList;

  const loginInfo = useSelector((state) => state.loginInfo);
  const { user, success: successUser } = loginInfo;
  useEffect(() => {
    if (successUser && user.data.role === "admin") {
      dispatch(getRestaurantList());
    } else {
      history.push("/login");
    }
  }, [dispatch, successUser, user]);
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
              <th></th>
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
                  <button>
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
