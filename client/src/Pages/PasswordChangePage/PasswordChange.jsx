import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/UserActions/updateUserProfileActions";
import Message from "../../Components/Message/Message";
import Loader from "../../Components/Loading/Loader";
import {UPDATE_PASSWORD_RESET} from '../../Constants/UserConstants/UpdateUserDataConstants'
const PasswordChangePage = ({history}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const passwordUpdate = useSelector((state) => state.passwordUpdate);
  const { loading, success, error } = passwordUpdate;
  useEffect(() => {
      if(success){
       
        history.push('/')
        dispatch({type:UPDATE_PASSWORD_RESET})
      }
  },[success,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    
      setMessage("Passwords do not match");
      setTimeout(()=> {
          dispatch({type:UPDATE_PASSWORD_RESET})
         


      },2000)

    }else{
        dispatch(updatePassword(password, newPassword));
       
          dispatch({type:UPDATE_PASSWORD_RESET})
        
    }
  };
  return (
    <div>
        {message && <Message> {message} </Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div className="form-container">
          <form onSubmit={submitHandler}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordChangePage;
