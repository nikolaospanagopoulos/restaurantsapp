import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PasswordResetRequest } from "../../Actions/UserActions/ForgotPasswordActions";
import { USER_RESET_PASSWORD_RESET } from "../../Constants/UserConstants/ForgotUserPasswordConstants";
const ResetPasswordPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = match.params.id;
  const resetPassword = useSelector((state) => state.resetPassword);
  const { success: successReset } = resetPassword;

  useEffect(() => {
    if (successReset) {
      dispatch({ type: USER_RESET_PASSWORD_RESET });
      history.push("/");
    }
  }, [dispatch, history, successReset]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(PasswordResetRequest(password, token));
    }
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label>Your New Password</label>
          <input
            type="password"
            className="input-login-register"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            className="input-login-register"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
