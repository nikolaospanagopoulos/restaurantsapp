import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../Actions/UserActions/GetUserAction";
import { useHistory } from "react-router-dom";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
const UserEditPage = ({ match }) => {
  const previousPage = useHistory();
  const userId = match.params.userId;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, success, error, loading } = userDetails;

  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if(!user.data.name || user.data._id !== userId){
      dispatch(getUserAction(userId));
    }else{
      setName(user.data.name)
      setEmail(user.data.email)
      setIsAdmin(user.data.isAdmin)
     
    }
   
  }, [userId, dispatch,user]);
  console.log(user)
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div>
        <button onClick={() => previousPage.goBack()}> Back </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div>
          <div className="form-container">
            <form onSubmit={submitHandler}>
              <div>
                <label>Name...</label>
                <input
                  className="input-login-register"
                  type="text"
                  placeholder="enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email...</label>
                <input
                  className="input-login-register"
                  type="email"
                  placeholder="enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Is Admin...</label>
                <input
                  className="input-login-register"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default UserEditPage;
