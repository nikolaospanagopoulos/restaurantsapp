import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../Actions/UserActions/RegisterActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import { USER_REGISTER_RESET } from "../../Constants/UserConstants/RegisterConstants";
const RegisterPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  useEffect(() => {
    if (success) {
      history.push("/");
    } else if (error) {
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
      }, 3000);
    }
  }, [history, success, error, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, password, name));
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
                <label>Your Name...</label>
                <input
                  className="input-login-register"
                  type="text"
                  placeholder="enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                Already A Member ?{" "}
                <Link className="register-link" to={"/login"}>
                  Login
                </Link>
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
