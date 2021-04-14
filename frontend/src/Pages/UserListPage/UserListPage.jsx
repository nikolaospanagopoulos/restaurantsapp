import React, { useEffect } from "react";
import { getUserListAction } from "../../Actions/UserActions/GetUserListActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../../Actions/UserActions/DeleteUserActions";
import Loader from "../../Components/Loading/Loader";
import { USER_LIST_RESET } from "../../Constants/UserConstants/GetUserListConstants";
import { Link } from "react-router-dom";
import Message from "../../Components/Message/Message";
import "./UserListPage.css";
const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const loginInfo = useSelector((state) => state.loginInfo);
  const { user, loading: loadingUser } = loginInfo;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  useEffect(() => {
    if (!user || !user.data.role === "admin") {
      history.push("/");
    } else {
      dispatch({ type: USER_LIST_RESET });
      dispatch(getUserListAction());
    }
  }, [dispatch, user, history, successDelete]);



  const deleteHandler = (id) => {
    const question = window.confirm("Are you sure ?");
    if (question) {
      dispatch(deleteUserAction(id));
    } else {
      return;
    }
  };
  return (
    <div>
      {error ? (
        <Message> {error} </Message>
      ) : loading ? (
        <Loader />
      ) : loadingDelete ? (
        <Loader />
      ) : loadingUser ? (
        <Loader />
      ) : errorDelete ? (
        <Message> {errorDelete} </Message>
      ) : (
        <table className="dishes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user._id}>
                <td> {user._id} </td>
                <td> {user.name} </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "owner"
                    ? "owner"
                    : user.role === "admin"
                    ? "admin"
                    : "user"}
                </td>

                <td>
                  {" "}
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteHandler(user._id)}>
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

export default UserListPage;
