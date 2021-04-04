import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/UserActions/logoutAction";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstants/UpdateUserDataConstants";

import { loginInfoAction } from "../../Actions/UserActions/LogedUserInfoActions";
const Ul = styled.ul`
  @import url("https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap");
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 15px;
  }
  a {
    text-decoration: none;
    color: black;
    font-size: 1.22rem;
    text-transform: uppercase;
    font-family: "Sue Ellen Francisco", cursive;
    -webkit-text-stroke: 0.5px black;
  }
  a:hover {
    color: teal;
  }
  .logoutlink {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #ff3333, #ffff99);
  }
  .logoutlink2 {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #ff3333, #ffff99);
  }
  .logoutlink3 {
    text-align: center;
    border-top: 0px;
   
    background-image: linear-gradient(to top, #ff3333, #ffff99);
  }
  .logoutlink4 {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #ff3333, #ffff99);
  }
  .logoutlink a {
    text-decoration: none;
    color: black;
  }
  .special-links {
    position: relative;
    bottom: 1rem;
  }
  @media (max-width: 768px) {
    border: 1px solid black;
    flex-flow: column nowrap;
    background-image: linear-gradient(to bottom right, #ff3333, #ffff99);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 18;
    transition: transform 0.3s ease-in-out;
    li {
    }
    .logoutlink a {
      text-decoration: none;
      color: black;
    }
  }
`;
const RightNav = ({ open, setOpen, history }) => {
  const [menuAppear, setMenuAppear] = useState(false);
  const loginInfo = useSelector((state) => state.loginInfo);
  const { loading, success, user } = loginInfo;
  const dispatch = useDispatch();
console.log(user)
  const userLogin = useSelector((state) => state.userLogin);
  const {  
    success: successLogin,
  } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    userInfo,
  } = userUpdate;

  const userRegister = useSelector((state) => state.userRegister);
  const { success: successRegister } = userRegister;

  const passwordUpdate = useSelector((state) => state.passwordUpdate);
  const {
    success: successPassword,
  } = passwordUpdate;
  useEffect(() => {
    if (
      (successLogin && !user) ||
      (successRegister && !user) ||
      (successUpdate )
    ) {
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(loginInfoAction());
    }
  }, [
    dispatch,
    successLogin,
    user,
    successRegister,
    successUpdate,
    successPassword,
  ]);

  useEffect(() => {
    dispatch(loginInfoAction());
  }, [dispatch]);
  const handleClick = () => {
    setOpen(false);
  };
  const logoutHandler = () => {
    function eraseCookie(name) {
      document.cookie = name + "=; Max-Age=0";
    }
    eraseCookie("token");

    window.location.href = "/";

    dispatch(logout());
  };

  return (
    <Ul
      open={open}
      onClick={handleClick}
      onMouseEnter={() => setMenuAppear(false)}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tours">Restaurants</Link>
      </li>
      <li>
        <Link to="/dishes">Dishes</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {user ? (
        <div style={{zIndex:'5000'}}>
          <div
            onMouseEnter={() => setMenuAppear(!menuAppear)}
            onMouseLeave={() => setMenuAppear(false)}
          >
            <li>
              <Link to="/profile">
                {loading ? "" : success && user.data.name}
              </Link>
            </li>
            {menuAppear && (
              <div className="special-links">
                <li className="logoutlink">
                  <Link to="/" onClick={() => logoutHandler()}>
                    Logout
                  </Link>
                </li>
                {(user || userInfo) && user.data.isAdmin ? (
                  <div>
                    <li className="logoutlink2">
                      <Link to="/admin/userlist">Users</Link>
                    </li>
                    <li className="logoutlink3">
                      <Link to="/admin/tourlist">Product List</Link>
                    </li>
                    <li className="logoutlink4">
                      <Link to="/admin/orderlist">Order List</Link>
                    </li>
                  </div>
                ): (user || userInfo) && user.data.role === 'owner' && !user.data.isAdmin ? (
                  <div>
                  <li className="logoutlink3">
                    <Link to={`/owner/restaurants/${user.data._id}`}>My Restaurants</Link>
                  </li>
                </div>
                ):''}
              </div>
            )}
          </div>
        </div>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </Ul>
  );
};
export default RightNav;
