import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Ul = styled.ul`
@import url('https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap');
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  
  li {
    padding: 18px 15px;
  }
  a {
    text-decoration: none;
    color: black;
    font-size:1.22rem;
    text-transform: uppercase;
    font-family: 'Sue Ellen Francisco', cursive;
    -webkit-text-stroke: 0.5px black;
  }
  a:hover {
    color: teal;
  }
  .logoutlink {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #4dff4d, #66ffe0);
  }
  .logoutlink2 {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #66ffe0, #4dff4d);
  }
  .logoutlink3 {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #4dff4d, #66ffe0);
  }
  .logoutlink4 {
    text-align: center;
    border-top: 0px;
    background-image: linear-gradient(to top, #66ffe0, #4dff4d)
  }
  .logoutlink a {
    text-decoration: none;
    color: black;
  }
  .special-links{
    position: relative;
    bottom:1rem;
  }
  @media (max-width: 768px) {
    border: 1px solid black;
    flex-flow: column nowrap;
    background-color: #66ff66;
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


  const handleClick = () => {
    setOpen(false);
  };
  const logoutHandler = () => {
    
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
        <Link to="/cart">Cart</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      
        <div
          onMouseEnter={() => setMenuAppear(!menuAppear)}
          onMouseLeave={() => setMenuAppear(false)}
        >
          
          {menuAppear && (
            <div className='special-links'>
              
             
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
             
            </div>
          )}
        </div>
     
        <li>
          <Link to="/login">Sign In</Link>
        </li>
 
    </Ul>
  );
};
export default RightNav;