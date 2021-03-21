import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import { loginInfoAction } from "../../Actions/UserActions/LogedUserInfoActions";
import { USER_UPDATE_PROFILE_RESET } from "../../Constants/UserConstants/LogedInUserInfoConstants";
import { updateProfile } from "../../Actions/UserActions/updateUserProfileActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstants/UpdateUserDataConstants";
const ProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);
  const { loading, success, user, error } = loginInfo;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate, loading: loadingUpdate } = userUpdate;
  useEffect(() => {
    if (!success) {
      history.push("/login");
    } else {
      if (!success || !user || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(loginInfoAction());
      } else {
        setName(user.data.name);
        setEmail(user.data.email);
      }
    }
  }, [dispatch, history, success, user, successUpdate]);

  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
    history.push("/");
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div className="form-container">
          <form onSubmit={updateSubmit}>
            <div>
              <label>Name...</label>
              <input
                type="text"
                className="input-login-register"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email...</label>
              <input
                type="email"
                className="input-login-register"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password...</label>
              <input
                type="password"
                className="input-login-register"
                value={password}
              />
              <label>Confirm Password...</label>
              <input type="password" className="input-login-register" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
