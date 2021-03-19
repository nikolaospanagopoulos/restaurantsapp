import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../Actions/UserActions/LoginActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (name === cookiePair[0].trim()) {
        // Decode the cookie value and return
        return setCookie(decodeURIComponent(cookiePair[1]));
      }
    }

    // Return null if not found
    return null;
  }
  //console.log(cookies)
  useEffect(() => {
<<<<<<< HEAD
    getCookie("token");
    if (cookie.length > 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, cookie]);
=======
    if (success) {
        console.log(success)
      history.push(redirect);
    }
  }, [history, success, redirect]);
>>>>>>> bc1dfcb9c692efb8b031056812e504100e3430b9
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
                <label>Your Email...</label>
                <input
                  type="email"
                  placeholder="enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
<<<<<<< HEAD
                <label></label>
=======
                <label>Your Password...</label>
>>>>>>> bc1dfcb9c692efb8b031056812e504100e3430b9
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
