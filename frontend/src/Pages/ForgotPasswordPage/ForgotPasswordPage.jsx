import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetRequest } from "../../Actions/UserActions/ForgotPasswordActions";
import Message from "../../Components/Message/Message";
import { USER_FORGOT_PASSWORD_RESET } from "../../Constants/UserConstants/ForgotUserPasswordConstants";
const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const {  error, success } = forgotPassword;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetRequest(email));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
      history.push("/");
    }
  }, [success, dispatch, history]);
  return (
    <div>
      {error ? (
        <Message> {error} </Message>
      ) : (
        <div className="form-container">
          <form onSubmit={submitHandler}>
            <label>Write Your Email</label>
            <input
              type="text"
              className="input-login-register"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
