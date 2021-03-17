import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../Actions/UserActions/LoginActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
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
          <div>
            <form onSubmit={submitHandler}>
              <div>
                <label>email</label>
                <input
                  type="email"
                  placeholder="enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label password></label>
                <input
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
            <div>
              <h3>
                New Customer ?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
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
