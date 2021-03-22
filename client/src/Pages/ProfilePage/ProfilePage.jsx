import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import { loginInfoAction } from "../../Actions/UserActions/LogedUserInfoActions";
import { USER_UPDATE_PROFILE_RESET } from "../../Constants/UserConstants/LogedInUserInfoConstants";
import {
  updateProfile,
  updatePassword,
} from "../../Actions/UserActions/updateUserProfileActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstants/UpdateUserDataConstants";
const ProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);
  const { loading, success, user, error } = loginInfo;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate, loading: loadingUpdate } = userUpdate;

  const passwordUpdate = useSelector((state) => state.passwordUpdate);
  const {
    success: successPassword,
    loading: loadingPassword,
    passwordData,
  } = passwordUpdate;
  useEffect(() => {
    if (!success) {
      history.push("/login");
    } else {
      if (!success || !user || successUpdate || successPassword) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(loginInfoAction());
      } else {
        setName(user.data.name);
        setEmail(user.data.email);
      }
    }
  }, [dispatch, history, success, user, successUpdate, successPassword]);
  console.log(passwordData);
  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
    history.push("/");
    if (password === confirmPassword && newPassword.length > 1) {
      dispatch(updatePassword(password, newPassword));

      // }else{
      //    setMessage('Passwords do not match')
      // }
    }
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Password...</label>
              <input
                type="password"
                className="input-login-register"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>New Password...</label>
              <input
                type="password"
                className="input-login-register"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
