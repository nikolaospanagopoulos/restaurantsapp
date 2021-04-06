import React, { useEffect, useState } from "react";
import { getUserListAction } from "../../Actions/UserActions/GetUserListActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../../Actions/UserActions/DeleteUserActions";
import Loader from "../../Components/Loading/Loader";
import { Link } from "react-router-dom";
import Message from "../../Components/Message/Message";
import "./UserListPage.css";
const UserListPage = ({ history }) => {
  const [nextPage, setNextPage] = useState(Number);
  const [previousPage, setPreviousPage] = useState(Number);
  const dispatch = useDispatch();

  const loginInfo = useSelector((state) => state.loginInfo);
  const { user, loading: loadingUser } = loginInfo;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete,success:successDelete } = userDelete;
  useEffect(() => {
    if (!user || !user.data.isAdmin) {
      history.push("/");
    } else {
      dispatch(getUserListAction());
    }
  }, [dispatch, user, history,successDelete]);

  useEffect(() => {
    if (users.pagination) {
      if (users.pagination.next) {
        setNextPage(users.pagination.next.page);
      } else if (!users.pagination.next) {
        setNextPage(null);
      }

      if (users.pagination.prev) {
        setPreviousPage(users.pagination.prev.page);
      }
    }
  }, [users.pagination]);
  console.log(users);

  const pageClick = (pageNum) => {
    dispatch(getUserListAction(pageNum));
  };
  const deleteHandler = (id) => {
    const question = window.confirm('Are you sure ?')
    if(question){
      dispatch(deleteUserAction(id))
    }else{
      return
    }
    
  };
  return (
    <div>
      {error ? (
        <Message> {error} </Message>
      ) : loading ? (
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
      <div className="users-pagination">
        {!loading && previousPage <= 2 && nextPage > 2 ? (
          <div>
            <button onClick={() => pageClick(previousPage)}>Previous</button>
            <button onClick={() => pageClick(nextPage)}>Next</button>
          </div>
        ) : !loading && nextPage === 2 && previousPage < 2 ? (
          <div>
            <button onClick={() => pageClick(nextPage)}>Next</button>
          </div>
        ) : (
          !loading &&
          !nextPage && (
            <div>
              <button onClick={() => pageClick(previousPage)}>Previous</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserListPage;
