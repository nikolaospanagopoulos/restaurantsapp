import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../Actions/UserActions/GetUserAction";
import {updateUserAction} from '../../Actions/UserActions/UpdateUserActions'
import {useHistory} from 'react-router-dom'
import {USER_UPDATE_RESET} from '../../Constants/UserConstants/UserUpdateConstants'
import Loader from '../../Components/Loading/Loader'
import Message from '../../Components/Message/Message'
const UserEditPage = ({ match }) => {
  const previousPage = useHistory()
  const userId = match.params.userId;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user,  error, loading } = userDetails;

  const userUpdateById = useSelector((state) => state.userUpdateById);
  const {  success:successUpdate, error:errorUpdate, loading:loadingUpdate } = userUpdateById;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role,setRole] = useState('')

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      previousPage.goBack()
    }else{
      if(!user.data.name || user.data._id !== userId){
        dispatch(getUserAction(userId));
      }else{
        setName(user.data.name)
        setEmail(user.data.email)
        setRole(user.data.role)
        
      }
    }

   
  }, [userId, dispatch,user,successUpdate,previousPage]);

  const submitHandler = (e) => { 
    e.preventDefault()
    dispatch(updateUserAction({
      _id:userId,
      name,
      email,
      role
    }))
  }
  return (
    <div>
      <div>
        <button onClick={() => previousPage.goBack()}> Back </button>
      </div>
      {loading ? (
      <Loader />
    ) : loadingUpdate ?
    <Loader/>
    : error ? (
      <Message> {error} </Message>
    ) : errorUpdate ? 
    <Message> {errorUpdate} </Message> 
    : (
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
              <label>Role...</label>
              <input
                className="input-login-register"
                type="text"
                placeholder="enter your email..."
                value={role}
                onChange={(e) => setRole(e.target.value)}
                
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
        <div>
     
        </div>
      </div>
    )}
    </div>
  );
};

export default UserEditPage;
