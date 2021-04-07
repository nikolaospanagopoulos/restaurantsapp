import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../Actions/UserActions/LoginActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import { USER_LOGOUT } from "../../Constants/UserConstants/LoginConstants";
const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const previousPage = useHistory();
  useEffect(() => {
    if (success) {
      console.log(success);
      previousPage.goBack();
    } else if (error) {
      setTimeout(() => {
        dispatch({ type: USER_LOGOUT });
      }, 3000);
    }
  }, [history, success, redirect, dispatch, error, previousPage]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div>
          <div className="form-container">
            <form onSubmit={submitHandler}>
              <div>
                <label>Your Email...</label>
                <input
                  className="input-login-register"
                  type="email"
                  placeholder="enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Your Password...</label>
                <input
                  className="input-login-register"
                  type="password"
                  placeholder="enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div>
            <div className="register-link-container">
              <h3>
                New Customer ?{" "}
                <Link className="register-link" to={"/register"}>
                  Register
                </Link>
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
